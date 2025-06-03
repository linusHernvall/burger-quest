"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { Textarea } from "@/components/ui/textarea";

export default function AddBurger() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const burgerName = formData.get("burgerName") as string;
    const restaurant = formData.get("restaurant") as string;
    const rating = parseInt(formData.get("rating") as string, 10);
    const content = formData.get("content") as string;

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    (e.target as HTMLFormElement).reset();
    setSelectedImage(null);
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
        <Button className="cursor-pointer" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
