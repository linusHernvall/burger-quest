"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/backend/supabase/client";
import BurgerCard from "./burgerCard";

interface Burger {
  id: string;
  burger_name: string;
  restaurant: string;
  rating: number;
  image_url: string;
}

interface GetBurgersResult {
  error?: string;
  burgers?: Burger[];
  highestRating?: number;
  isUniqueHighest?: boolean;
}

async function getBurgers(retryCount = 3): Promise<GetBurgersResult> {
  for (let i = 0; i < retryCount; i++) {
    try {
      const { data: burgers, error } = await supabase
        .from("burgers")
        .select("*")
        .order("rating", { ascending: false });

      if (error) {
        console.error(
          `Error fetching burgers (attempt ${i + 1}/${retryCount}):`,
          error.message
        );
        if (i === retryCount - 1) {
          return { error: "Failed to load burgers." };
        }
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }

      if (!burgers || burgers.length === 0) {
        return { error: "No burgers found." };
      }

      // Get the highest rating
      const highestRating = burgers[0].rating;

      // Count how many burgers have the highest rating
      const highestRatedBurgers = burgers.filter(
        (b) => b.rating === highestRating
      );
      const isUniqueHighest = highestRatedBurgers.length === 1;

      return {
        burgers: burgers.sort((a, b) => b.id - a.id),
        highestRating,
        isUniqueHighest,
      };
    } catch (error) {
      console.error(
        `Error fetching burgers (attempt ${i + 1}/${retryCount}):`,
        error
      );
      if (i === retryCount - 1) {
        return { error: "Failed to load burgers." };
      }
      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return { error: "Failed to load burgers after multiple attempts." };
}

export default function CardGrid() {
  const [result, setResult] = useState<GetBurgersResult>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBurgers = async () => {
      setIsLoading(true);
      const data = await getBurgers();
      setResult(data);
      setIsLoading(false);
    };

    fetchBurgers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        Loading...
      </div>
    );
  }

  if (result.error) {
    return <p className="text-red-500">{result.error}</p>;
  }

  if (
    !result.burgers ||
    !result.highestRating ||
    result.isUniqueHighest === undefined
  ) {
    return <p className="text-red-500">Failed to load burgers.</p>;
  }

  const { burgers, highestRating, isUniqueHighest } = result;

  return (
    <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {burgers.map((burger) => (
        <BurgerCard
          key={burger.id}
          id={burger.id}
          burger={burger.burger_name}
          restaurant={burger.restaurant}
          rating={burger.rating}
          image={burger.image_url}
          isHighestRated={burger.rating === highestRating}
          isUniqueHighest={isUniqueHighest && burger.rating === highestRating}
        />
      ))}
    </div>
  );
}
