"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { supabase } from "@/backend/supabase/client";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { ImageDropzone } from "@/components/image-dropzone";
import { Textarea } from "@/components/textarea";
import { RatingInput } from "@/components/rating-input";

export default function AddBurger() {
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Du måste vara inloggad för att lägga till en hamburgare");
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

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

      // Upload via server-side API route
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload image");
      }

      const { url } = await response.json();
      return url;
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
      const ratingString = formData.get("rating_decimal") as string;
      const rating = parseFloat(ratingString);
      const content = formData.get("content") as string;

      // Validate rating is within valid range
      if (isNaN(rating) || rating < 1 || rating > 10) {
        toast.error("Betyget måste vara mellan 1 och 10");
        return;
      }

      let imageUrl = null;

      // Upload image if selected
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

      const roundedRating = Math.round(rating * 10) / 10;
      // console.log("Original rating:", rating, "Rounded rating:", roundedRating);

      const { error: insertError } = await supabase.from("burgers").insert({
        burger_name: burgerName,
        restaurant,
        rating: roundedRating,
        content,
        image_url: imageUrl,
      });

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        console.error("Error details:", JSON.stringify(insertError, null, 2));
        console.error("Error message:", insertError.message);
        console.error("Error code:", insertError.code);
        console.error("Error details:", insertError.details);
        console.error("Error hint:", insertError.hint);
        throw insertError;
      }

      router.push(
        `/?success=true&burgerName=${encodeURIComponent(burgerName)}`
      );
      router.refresh();
    } catch (error) {
      console.error("Error submitting burger:", error);
      toast.error("Failed to post burger review. Please try again.");
    } finally {
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
      setSelectedImage(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl py-10 px-4 md:py-20">
      <h1 className="text-4xl pb-8 font-bold">Lägg till en ny hamburgare</h1>
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <Input
          type="text"
          name="burgerName"
          placeholder="Hamburgarens namn"
          required
        />
        <Input
          type="text"
          name="restaurant"
          placeholder="Restaurang"
          required
        />
        <RatingInput name="rating" placeholder="Betyg (1-10)" required />
        <ImageDropzone
          onChange={(file) => setSelectedImage(file)}
          className="w-full"
        />
        <Textarea
          name="content"
          placeholder="Tankar om hamburgaren..."
          required
        />
        <Button
          className="cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Lägger till..." : "Lägg till"}
        </Button>
      </form>
    </div>
  );
}
