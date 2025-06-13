"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "./button";

export function AddBurgerButton() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Link href="add-burger">
      <Button className="cursor-pointer">
        Lägg till hamburgare <span className="text-2xl">+</span>
      </Button>
    </Link>
  );
}
