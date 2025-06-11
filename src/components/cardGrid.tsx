import { supabase } from "@/backend/supabase/client";
import BurgerCard from "./burgerCard";

export default async function CardGrid() {
  const { data: burgers, error } = await supabase.from("burgers").select("*");

  if (error) {
    console.error("Error fetching burgers:", error.message);
    return <p className="text-red-500">Failed to load burgers.</p>;
  }

  // Find the highest rated burger
  const highestRatedBurger = burgers?.reduce(
    (highest, current) => (current.rating > highest.rating ? current : highest),
    burgers[0]
  );

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
            isHighestRated={highestRatedBurger?.id === burger.id}
          />
        ))}
    </div>
  );
}
