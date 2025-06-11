import Link from "next/link";

import { Button } from "./button";
import Image from "next/image";

interface BurgerCardProps {
  id: string;
  burger: string;
  restaurant: string;
  rating: number;
  image: string;
  isHighestRated: boolean;
}

export default function BurgerCard({
  id,
  burger,
  restaurant,
  rating,
  image,
  isHighestRated,
}: BurgerCardProps) {
  return (
    <div>
      <div className="relative h-[480px] bg-[#404040] rounded-lg overflow-hidden group">
        {/* ::before effect */}
        <div className="absolute top-[-50%] w-full h-full bg-primary skew-y-[345deg] transition-all duration-500 group-hover:top-[-70%] group-hover:skew-y-[390deg] z-0" />

        <div className="relative flex justify-center items-center pt-5 z-10">
          <Image
            src={image}
            alt={`A tasty ${burger} burger.`}
            className="h-[272px] w-[272px]transition-all duration-500 group-hover:scale-150 lg:sepia lg:group-hover:sepia-0"
            width={272}
            height={272}
            priority
          />
          {isHighestRated && (
            <div className="absolute top-2 right-2 transform rotate-12">
              <div className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-full shadow-lg border-2 border-yellow-600 flex items-center gap-1">
                <span className="text-lg">⭐</span>
                <span>Sheriff</span>
              </div>
            </div>
          )}
        </div>

        <div className="relative  flex flex-col justify-center items-center z-10">
          <p className="text-white text-2xl font-bold uppercase tracking-wider">
            {burger}
          </p>
          <p className="text-white text-lg tracking-wider">{restaurant}</p>
          <p className="text-white text-2xl font-bold tracking-wider pt-2">
            {rating}/10
          </p>
          <Link href={`/burger/${id}`}>
            <Button className="relative cursor-pointer mt-4 top-0 opacity-100 px-[32px] py-[16px] text-black no-underline rounded-lg capitalize tracking-wider transition-all duration-500 lg:top-[100px] lg:group-hover:top-0 lg:group-hover:opacity-100">
              Read more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
