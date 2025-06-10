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

  const formattedDate = new Date(burger.created_at).toISOString().slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden relative border-8 border-primary">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-primary transform -rotate-45 -translate-x-8 -translate-y-8"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-primary transform rotate-45 translate-x-8 -translate-y-8"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary transform rotate-45 -translate-x-8 translate-y-8"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary transform -rotate-45 translate-x-8 translate-y-8"></div>

        <div className="relative h-[320px] lg:h-[480px] w-full">
          <Image
            src={burger.image_url}
            alt={`A tasty ${burger.burger_name}`}
            fill
            className="object-cover transition-all duration-300"
            priority
          />
          {/* Vintage photo frame effect */}
          <div className="absolute inset-0 border-8 border-primary opacity-50"></div>
        </div>

        <div className="p-8 pt-4 relative">
          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl font-bold mb-2 text-[#8b4513]">
                {burger.burger_name}
              </h1>
              <p className="text-xl text-[#8b4513] mb-2 italic">
                Last seen at: {burger.restaurant}, {formattedDate}
              </p>
              <p className="text-2xl font-bold tracking-wider mb-2 text-[#8b4513]">
                {burger.rating}/10
              </p>
              <p className="text-lg text-[#8b4513]">{burger.content}</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-1/2">
              <Button className="bg-[#8b4513] text-white min-w-[50%] px-6 py-2 rounded-lg hover:bg-[#6b3410]">
                Edit burger
              </Button>
              <Button className="bg-red-800 text-white min-w-[50%] px-6 py-2 rounded-lg hover:bg-red-900">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
