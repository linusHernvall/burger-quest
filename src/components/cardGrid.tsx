"use client";

import { supabase } from "@/backend/supabase/client";

import BurgerCard from "./burgerCard";

interface BurgerCardProps {
  burgerName: string;
  restaurantName: string;
  rating: number;
  image: string;
}

export default async function CardGrid() {
  return (
    <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* {burgers?.map((burger) => (
        <BurgerCard
          key={burger.id}
          burgerName={burger.name}
          restaurantName={burger.restaurant_name}
          rating={burger.rating}
          image={burger.image_url}
        />
      ))} */}
    </div>
  );
}
