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
      <Button className="cursor-pointer">Add Burger</Button>
    </Link>
  );
}
