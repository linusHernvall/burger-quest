"use client";

// import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { DeleteBurgerModal } from "@/components/delete-burger-modal";

interface AdminBurgerMenuProps {
  burgerId: string;
  burgerName: string;
}

export function AdminBurgerMenu({
  burgerId,
  burgerName,
}: AdminBurgerMenuProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = useCallback(() => {
    router.push(`/edit-burger/${burgerId}`);
  }, [burgerId, router]);

  const handleDelete = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="p-2 border-black focus:border-1"
            aria-label="Admin actions"
          >
            {/* <DotsHorizontalIcon className="w-6 h-6" /> */}
            <HamburgerMenuIcon className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          sideOffset={8}
          className="z-50 min-w-[120px] rounded-md border border-neutral-200 bg-white p-1 shadow-lg focus:outline-none"
        >
          <DropdownMenu.Item
            onSelect={handleEdit}
            className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100 rounded cursor-pointer"
          >
            Redigera
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={handleDelete}
            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-neutral-100 rounded cursor-pointer"
          >
            Ta bort
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DeleteBurgerModal
        burgerId={burgerId}
        burgerName={burgerName}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
