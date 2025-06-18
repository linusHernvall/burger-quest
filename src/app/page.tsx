"use client";

import { useEffect, useState } from "react";
import CardGrid from "@/components/cardGrid";
import { AddBurgerButton } from "@/components/add-burger-button";
import ToastClientWrapper from "@/components/toastClientWrapper";
import { SheriffModal } from "@/components/sheriff-modal";

export default function Home() {
  const [showSheriffModal, setShowSheriffModal] = useState(false);
  const [burgerName, setBurgerName] = useState("");

  useEffect(() => {
    // Check if we should show the modal
    const shouldShowModal = localStorage.getItem("showSheriffModal") === "true";
    const storedBurgerName = localStorage.getItem("burgerName");

    if (shouldShowModal && storedBurgerName) {
      // Add a small delay to ensure the page is fully loaded
      const timer = setTimeout(() => {
        setBurgerName(storedBurgerName);
        setShowSheriffModal(true);
        // Clean up localStorage
        localStorage.removeItem("showSheriffModal");
        localStorage.removeItem("burgerName");
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setShowSheriffModal(false);
  };

  return (
    <div className="mx-auto max-w-5xl py-10 px-4 md:py-20 xl:container">
      <h1 className="text-4xl pb-8 font-bold">Välkommen till Burger Quest!</h1>
      <p className="pb-4">
        Se en hamburgarjakt utvecklas när vi försöker hitta den bästa
        hamburgaren.
      </p>
      <AddBurgerButton />
      <ToastClientWrapper />
      <CardGrid />
      <SheriffModal
        isOpen={showSheriffModal}
        onClose={handleCloseModal}
        burgerName={burgerName}
      />
    </div>
  );
}
