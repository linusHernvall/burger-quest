"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { supabase } from "@/backend/supabase/client";
import { Button } from "@/components/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DeleteBurger({ params }: PageProps) {
  const { id } = use(params);
  const [isDeleting, setIsDeleting] = useState(false);
  const [burgerName, setBurgerName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchBurger = async () => {
      try {
        const { data, error } = await supabase
          .from("burgers")
          .select("burger_name")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Burger not found");

        setBurgerName(data.burger_name);
      } catch (error) {
        console.error("Error fetching burger:", error);
        toast.error("Failed to load burger data");
        router.push("/");
      }
    };

    fetchBurger();
  }, [id, router]);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      // Delete the burger from the database
      const { error } = await supabase.from("burgers").delete().eq("id", id);

      if (error) throw error;

      toast.success(`${burgerName} has been deleted successfully!`);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error deleting burger:", error);
      toast.error("Failed to delete burger. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl py-10 px-4 md:py-20">
      <div className="bg-background/50 backdrop-blur-sm rounded-lg shadow-lg p-8 border-8 border-primary">
        <h1 className="text-4xl pb-8 font-bold text-red-600">Delete Burger</h1>
        <p className="text-xl mb-8">
          Are you sure you want to delete{" "}
          <span className="font-bold">{burgerName}</span>? This action cannot be
          undone.
        </p>
        <div className="flex gap-4">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </Button>
          <Button
            className="bg-gray-600 hover:bg-gray-700 text-white"
            onClick={() => router.back()}
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
