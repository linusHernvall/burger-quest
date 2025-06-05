"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function ToastClientWrapper() {
  const searchParams = useSearchParams();
  const hasShownToast = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    if (searchParams.get("success") === "true" && !hasShownToast.current) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        const burgerName = searchParams.get("burgerName");
        toast.success(`${burgerName} added successfully!`);
        hasShownToast.current = true;
      }, 500); // 500ms delay
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchParams]);

  return null;
}
