"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

interface ImageDropzoneProps {
  onChange: (file: File) => void;
  className?: string;
  existingImageUrl?: string | null;
}

export function ImageDropzone({
  onChange,
  className,
  existingImageUrl,
}: ImageDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(
    existingImageUrl || null
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange(file);
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-background hover:border-primary",
        className
      )}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="space-y-2">
          <img
            src={preview}
            alt="Preview"
            className="max-h-48 mx-auto rounded-lg object-contain"
          />
          <p>Klicka eller dra för att ersätta bilden</p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-lg font-medium">Dra och släpp din bild här</p>
          <p>eller klicka för att välja en bild</p>
        </div>
      )}
    </div>
  );
}
