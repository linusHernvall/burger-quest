"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SheriffModalProps {
  isOpen: boolean;
  onClose: () => void;
  burgerName: string;
}

export function SheriffModal({
  isOpen,
  onClose,
  burgerName,
}: SheriffModalProps) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex backdrop-blur-xs items-center justify-center ">
      <div
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
      />
      <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 transform transition-all border-2 border-black">
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✕
        </button>
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/woody.gif"
            alt="Sheriff Woody"
            width={400}
            height={320}
            className="w-[400px] h-auto"
          />
          <p className="text-2xl font-bold text-center">
            There&apos;s a new sheriff in town!
          </p>
          <div className="flex flex-row items-center justify-center w-full px-2 gap-2">
            <div className="w-full h-0.5 bg-black" />

            <h2 className="text-3xl font-bold text-center">{burgerName}</h2>
            <div className="w-full h-0.5 bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
