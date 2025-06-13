"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    try {
      logout();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="bg-background/50 backdrop-blur-sm border-b-8 border-primary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-4xl font-bold text-[#8b4513]">
            Burger Quest
          </Link>
          <div>
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                className="bg-[#8b4513] text-white hover:bg-[#6b3410]"
              >
                Logga ut
              </Button>
            ) : (
              <Link href="/login">
                <Button className="bg-[#8b4513] text-white hover:bg-[#6b3410]">
                  Logga in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
