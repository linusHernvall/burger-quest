"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { supabase } from "@/backend/supabase/client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { ImageDropzone } from "@/components/image-dropzone";
import { Textarea } from "@/components/textarea";

export default function AddBurger() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to post a burger review");
        return;
      }

      // Create burger post
      const { error: insertError } = await supabase.from("burgers").insert({
        burger_name: burgerName,
        restaurant,
        rating,
        content,
        image_url: imageUrl,
        user_id: user.id,
      });

      if (insertError) throw insertError;

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
      <h1 className="text-4xl pb-8 font-bold">Add a New Burger</h1>
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <Input
          type="text"
          name="burgerName"
          placeholder="Burger Name"
          required
        />
        <Input
          type="text"
          name="restaurant"
          placeholder="Restaurant"
          required
        />
        <Input
          type="number"
          name="rating"
          min={1}
          max={10}
          placeholder="Rating"
          required
        />
        <ImageDropzone
          onChange={(file) => setSelectedImage(file)}
          className="w-full"
        />
        <Textarea
          name="content"
          placeholder="Thoughts on the burger..."
          required
        />
        <Button
          className="cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
