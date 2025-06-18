import Image from "next/image";
import { supabase } from "@/backend/supabase/client";
import { AdminActions } from "@/components/admin-actions";
import { WantedPoster } from "@/components/wanted-poster";

interface BurgerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BurgerPage({ params }: BurgerPageProps) {
  const { id } = await params;

  // Get the specific burger
  const { data: burger, error: burgerError } = await supabase
    .from("burgers")
    .select("*")
    .eq("id", id)
    .single();

  // Get all burgers to find the highest rated one
  const { data: allBurgers, error: allBurgersError } = await supabase
    .from("burgers")
    .select("*")
    .order("rating", { ascending: false });

  if (burgerError) {
    console.error("Error fetching burger:", burgerError.message);
    return <p className="text-red-500">Failed to load burger details.</p>;
  }

  if (allBurgersError) {
    console.error("Error fetching all burgers:", allBurgersError.message);
    return <p className="text-red-500">Failed to load burger details.</p>;
  }

  if (!burger) {
    return <p className="text-red-500">Burger not found.</p>;
  }

  if (!allBurgers || allBurgers.length === 0) {
    return <p className="text-red-500">No burgers found.</p>;
  }

  // Get the highest rating
  const highestRating = allBurgers[0].rating;

  // Count how many burgers have the highest rating
  const highestRatedBurgers = allBurgers.filter(
    (b) => b.rating === highestRating
  );
  const isHighestRated = burger.rating === highestRating;
  const isUniqueHighest = isHighestRated && highestRatedBurgers.length === 1;

  const formattedDate = new Date(burger.created_at).toISOString().slice(0, 10);

  return (
    <div className="flex justify-center items-center h-[calc(100dvh-80px)] sm:h-auto px-4 md:py-6">
      <WantedPoster
        burgerName={burger.burger_name}
        restaurant={burger.restaurant}
        createdAt={formattedDate}
        imageUrl={burger.image_url}
        description={burger.content}
        rating={burger.rating}
        isHighestRated={isHighestRated}
        isUniqueHighest={isUniqueHighest}
        burgerId={id}
      />
    </div>
  );
}
