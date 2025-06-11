import { supabase } from "@/backend/supabase/client";
import BurgerCard from "./burgerCard";

export default async function CardGrid() {
  const { data: burgers, error } = await supabase
    .from("burgers")
    .select("*")
    .order("rating", { ascending: false });

  if (error) {
    console.error("Error fetching burgers:", error.message);
    return <p className="text-red-500">Failed to load burgers.</p>;
  }

  if (!burgers || burgers.length === 0) {
    return <p className="text-red-500">No burgers found.</p>;
  }

  // Get the highest rating
  const highestRating = burgers[0].rating;

  // Count how many burgers have the highest rating
  const highestRatedBurgers = burgers.filter((b) => b.rating === highestRating);
  const isUniqueHighest = highestRatedBurgers.length === 1;

  return (
    <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {burgers
        ?.sort((a, b) => b.id - a.id)
        .map((burger) => (
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
