"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <header className="mx-0">
      <div className="lg:container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-4xl">
            <Image
              src="/logo.png"
              alt="Logotype for Burger Quest"
              width={160}
              height={106}
              className="w-[160px] h-[106px] md:w-[240px] md:h-[160px]"
            />
          </Link>
          <div>
            {isAuthenticated ? (
              <Button onClick={handleLogout}>Logga ut</Button>
            ) : (
              <Link href="/login">
                <Button>Logga in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
