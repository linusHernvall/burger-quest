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
      toast.error("You must be logged in to edit a burger");
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
        toast.error("Failed to load burger data");
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
            error instanceof Error ? error.message : "Failed to upload image"
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

      toast.success(`${burgerName} updated successfully!`);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error updating burger:", error);
      toast.error("Failed to update burger. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {isLoading ? "Loading..." : "Please log in to continue"}
      </div>
    );
  }

  if (!burger) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Burger not found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl py-10 px-4 md:py-20">
      <h1 className="text-4xl pb-8 font-bold">Edit Burger</h1>
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <Input
          type="text"
          name="burgerName"
          placeholder="Burger Name"
          defaultValue={burger.burger_name}
          required
        />
        <Input
          type="text"
          name="restaurant"
          placeholder="Restaurant"
          defaultValue={burger.restaurant}
          required
        />
        <Input
          type="number"
          name="rating"
          min={1}
          max={10}
          placeholder="Rating"
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
          placeholder="Thoughts on the burger..."
          defaultValue={burger.content}
          required
        />
        <Button
          className="cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Burger"}
        </Button>
      </form>
    </div>
  );
}
