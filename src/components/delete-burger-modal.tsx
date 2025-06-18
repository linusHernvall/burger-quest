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

      toast.success(`${burgerName} har tagits bort framgångsrikt!`);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error deleting burger:", error);
      toast.error("Misslyckades att ta bort hamburgaren. Försök igen.");
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg p-8 border-2 border-black max-w-md w-full mx-4">
        <h1 className="text-3xl pb-8 font-bold ">Ta bort hamburgare</h1>
        <p className="text-xl mb-8 ">
          Är du säker på att du vill ta bort{" "}
          <span className="font-bold">{burgerName}</span>? Denna åtgärd kan inte
          ångras.
        </p>
        <div className="flex gap-4">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Tar bort..." : "Ja, ta bort"}
          </Button>
          <Button
            className="bg-gray-600 hover:bg-gray-700 text-white"
            onClick={onClose}
            disabled={isDeleting}
          >
            Avbryt
          </Button>
        </div>
      </div>
    </div>
  );
}
