"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function Home() {
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

    // Cleanup function to clear timeout if component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchParams]);

  return (
    <>
      <div className="mx-auto max-w-5xl py-10 px-4 md:py-20">
        <h1 className="text-4xl pb-8 font-bold">Welcome to Burger Quest!</h1>
        <p className=" pb-4 text-gray-500">
          Watch a burger battle unfold as we try to find the best burger.
        </p>
        <Link href="/add-burger">
          <Button className="cursor-pointer">Add Burger</Button>
        </Link>
      </div>
    </>
  );
}
