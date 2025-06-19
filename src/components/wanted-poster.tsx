"use client";

import Image from "next/image";

import { AdminBurgerMenu } from "./admin-burger-menu";
import { useAuth } from "@/context/auth-context";

interface WantedPosterProps {
  burgerName: string;
  restaurant: string;
  createdAt: string;
  imageUrl: string;
  description: string;
  rating: number;
  isHighestRated: boolean;
  isUniqueHighest: boolean;
  burgerId: string;
}

export function WantedPoster({
  burgerName,
  restaurant,
  createdAt,
  imageUrl,
  description,
  rating,
  isHighestRated,
  isUniqueHighest,
  burgerId,
}: WantedPosterProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div
      className="relative w-full max-w-2xl mx-auto aspect-[3/4] flex flex-col items-center justify-between p-0 bg-contain bg-no-repeat bg-center "
      style={{ backgroundImage: "url('/wanted-poster.png')" }}
    >
      <div className="flex flex-col items-center w-full pt-16 md:pt-20 px-2 sm:px-12 lg:px-8">
        <h1 className="text-2xl md:text-5xl text-center">
          {burgerName.toUpperCase()}
        </h1>
        <div className="absolute top-15 right-8 sm:right-18 md:top-20 lg:right-14">
          {isAuthenticated && (
            <AdminBurgerMenu burgerId={burgerId} burgerName={burgerName} />
          )}
        </div>

        <div className="flex flex-row items-center w-full px-8 gap-2">
          <div className="w-full h-0.5 bg-black mb-2" />
          <p
            className="text-xl md:text-3xl text-center mb-2 w-fit whitespace-nowrap"
            style={{ fontFamily: "var(--font-rye)" }}
          >
            {restaurant}
          </p>
          <div className="w-full h-0.5 bg-black mb-2" />
        </div>
        <div className="flex flex-col items-center px-6">
          <Image src="/banner.png" alt="Banner" width={160} height={8} />
        </div>
        {/* <div className="text-base text-center italic mb-2">
          Last seen: {createdAt}
        </div> */}
      </div>
      <div className="flex flex-col items-center w-full px-6">
        <div className="relative w-full flex justify-center">
          <div className="relative w-64 h-40 sm:w-120 sm:h-96 lg:w-160 lg:h-128">
            <Image
              src={imageUrl}
              alt={`Burger: ${burgerName}`}
              className="object-contain drop-shadow-xl "
              fill
              sizes="(max-width: 640px) 256px, (max-width: 1024px) 480px, 640px"
            />
          </div>
          {isHighestRated && (
            <div className="absolute top-0 right-0 sm:top-0 sm:right-16 transform rotate-12 z-20">
              <Image
                src={isUniqueHighest ? "/sheriff.png" : "/deputy.png"}
                alt={isUniqueHighest ? "Sheriff badge" : "Deputy badge"}
                width={64}
                height={64}
                className="drop-shadow-lg sm:w-24 sm:h-24"
                priority
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center w-full px-6">
        <p
          className="text-xl sm:text-4xl md:text-3xl mb-2 text-center"
          style={{ fontFamily: "var(--font-rye)" }}
        >
          Beskrivning
        </p>
        <p className="text-base text-center mb-8 px-8">{description}</p>
      </div>
      <div className="flex flex-col items-center w-full px-6 mb-10">
        <p className="text-lg sm:text-2xl md:text-3xl mb-2">Betyg</p>
        <p className="text-xl sm:text-3xl md:text-4xl mb-2">
          ★ {rating} av 10 ★
        </p>
      </div>
    </div>
  );
}
