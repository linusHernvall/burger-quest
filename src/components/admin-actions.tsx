"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "./button";
import { DeleteBurgerButton } from "./delete-burger-button";

interface AdminActionsProps {
  burgerId: string;
  burgerName: string;
}

export function AdminActions({ burgerId, burgerName }: AdminActionsProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-1/2">
      <Link href={`/edit-burger/${burgerId}`}>
        <Button className="bg-[#8b4513] text-white min-w-[50%] px-6 py-2 rounded-lg hover:bg-[#6b3410]">
          Redigera hamburgare
        </Button>
      </Link>
      <DeleteBurgerButton burgerId={burgerId} burgerName={burgerName} />
    </div>
  );
}
