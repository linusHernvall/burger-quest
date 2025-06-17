"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { use } from "react";

import { supabase } from "@/backend/supabase/client";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { ImageDropzone } from "@/components/image-dropzone";
import { Textarea } from "@/components/textarea";

interface Burger {
  id: string;
  burger_name: string;
  restaurant: string;
  rating: number;
  content: string;
  image_url: string | null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditBurger({ params }: PageProps) {
  const { id } = use(params);
  const { isAuthenticated } = useAuth();
  const [burger, setBurger] = useState<Burger | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Du måste vara inloggad för att redigera en hamburgare");
      router.push("/");
      return;
    }

    const fetchBurger = async () => {
      try {
        const { data, error } = await supabase
          .from("burgers")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Burger not found");

        setBurger(data);
      } catch (error) {
        console.error("Error fetching burger:", error);
        toast.error("Misslyckades att ladda hamburgarens data");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBurger();
  }, [id, router, isAuthenticated]);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif",
      ];
      if (!validTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Please upload a JPEG, PNG, WebP, or AVIF image."
        );
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error("File size too large. Maximum size is 5MB.");
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from("burger-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        if (uploadError.message.includes("Bucket not found")) {
          throw new Error(
            "Storage bucket not configured. Please contact support."
          );
        }
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("burger-images").getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const burgerName = formData.get("burgerName") as string;
      const restaurant = formData.get("restaurant") as string;
      const rating = parseInt(formData.get("rating") as string, 10);
      const content = formData.get("content") as string;

      let imageUrl = burger?.image_url;

      // Upload new image if selected
      if (selectedImage) {
        try {
          imageUrl = await uploadImage(selectedImage);
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Misslyckades att ladda upp bilden"
          );
          return;
        }
      }

      // Update burger in database
      const { error: updateError } = await supabase
        .from("burgers")
        .update({
          burger_name: burgerName,
          restaurant,
          rating,
          content,
          image_url: imageUrl,
        })
        .eq("id", id);

      if (updateError) throw updateError;

      // Check if this burger is now the highest rated
      const { data: allBurgers } = await supabase
        .from("burgers")
        .select("rating")
        .order("rating", { ascending: false });

      if (allBurgers && allBurgers.length > 0) {
        const highestRating = allBurgers[0].rating;
        const highestRatedBurgers = allBurgers.filter(
          (b) => b.rating === highestRating
        );
        const isUniqueHighest = highestRatedBurgers.length === 1;

        if (rating === highestRating && isUniqueHighest) {
          localStorage.setItem("showSheriffModal", "true");
          localStorage.setItem("burgerName", burgerName);
        }
      }

      toast.success(`${burgerName} uppdaterades framgångsrikt!`);

      // Use replace instead of push to ensure a fresh page load
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Error updating burger:", error);
      toast.error("Misslyckades att uppdatera hamburgaren. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {isLoading ? "Laddar..." : "Du måste vara inloggad för att fortsätta"}
      </div>
    );
  }

  if (!burger) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Hamburgaren hittades inte
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl py-10 px-4 md:py-20">
      <h1 className="text-4xl pb-8 font-bold">Redigera hamburgare</h1>
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <Input
          type="text"
          name="burgerName"
          placeholder="Hamburgarens namn"
          defaultValue={burger.burger_name}
          required
        />
        <Input
          type="text"
          name="restaurant"
          placeholder="Restaurang"
          defaultValue={burger.restaurant}
          required
        />
        <Input
          type="number"
          name="rating"
          min={1}
          max={10}
          placeholder="Betyg"
          defaultValue={burger.rating}
          required
        />
        <ImageDropzone
          onChange={(file) => setSelectedImage(file)}
          className="w-full"
          existingImageUrl={burger.image_url}
        />
        <Textarea
          name="content"
          placeholder="Tankar om hamburgaren..."
          defaultValue={burger.content}
          required
        />
        <Button
          className="cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Uppdaterar..." : "Uppdatera hamburgare"}
        </Button>
      </form>
    </div>
  );
}
