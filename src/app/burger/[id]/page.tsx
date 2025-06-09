import Image from "next/image";
import { supabase } from "@/backend/supabase/client";
import { Button } from "@/components/button";

interface BurgerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BurgerPage({ params }: BurgerPageProps) {
  const { id } = await params;

  const { data: burger, error } = await supabase
    .from("burgers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching burger:", error.message);
    return <p className="text-red-500">Failed to load burger details.</p>;
  }

  if (!burger) {
    return <p className="text-red-500">Burger not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-[320px] lg:h-[480px] w-full">
          <Image
            src={burger.image_url}
            alt={`A tasty ${burger.burger_name}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-8 pt-0">
          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl font-bold mb-2">{burger.burger_name}</h1>
              <p className="text-xl text-gray-600 mb-2">{burger.restaurant}</p>
              <p className="text-2xl font-bold tracking-wider mb-2">
                {burger.rating}/10
              </p>
              <p className="text-lg text-gray-700">{burger.content}</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-1/2">
              <Button className="bg-primary text-white min-w-[50%] px-6 py-2 rounded-lg hover:bg-primary/90">
                Edit burger
              </Button>
              <Button className="bg-red-500 text-white min-w-[50%] px-6 py-2 rounded-lg hover:bg-red-600">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
