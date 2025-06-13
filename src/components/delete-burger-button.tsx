"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { DeleteBurgerModal } from "@/components/delete-burger-modal";

interface DeleteBurgerButtonProps {
  burgerId: string;
  burgerName: string;
}

export function DeleteBurgerButton({
  burgerId,
  burgerName,
}: DeleteBurgerButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        className="bg-red-800 text-white min-w-[50%] px-6 py-2 rounded-lg hover:bg-red-900"
        onClick={() => setIsModalOpen(true)}
      >
        Ta bort
      </Button>
      <DeleteBurgerModal
        burgerId={burgerId}
        burgerName={burgerName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
