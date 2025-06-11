import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { supabase } from "@/backend/supabase/client";
import { Button } from "@/components/button";

interface DeleteBurgerModalProps {
  burgerId: string;
  burgerName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteBurgerModal({
  burgerId,
  burgerName,
  isOpen,
  onClose,
}: DeleteBurgerModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from("burgers")
        .delete()
        .eq("id", burgerId);

      if (error) throw error;

      toast.success(`${burgerName} has been deleted successfully!`);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error deleting burger:", error);
      toast.error("Failed to delete burger. Please try again.");
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background/50 backdrop-blur-sm rounded-lg shadow-lg p-8 border-8 border-primary max-w-md w-full mx-4">
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
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
