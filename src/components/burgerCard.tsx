import Link from "next/link";

import { Button } from "./button";
import Image from "next/image";
import burgerImage from "public/frisco.png";

interface BurgerCardProps {
  burger: string;
  restaurant: string;
  rating: number;
  image: string;
}

export default function BurgerCard({
  burger,
  restaurant,
  rating,
  image,
}: BurgerCardProps) {
  return (
    <div>
      <div className="relative w-[320px] h-[480px] bg-[#404040] rounded-lg overflow-hidden group">
        {/* ::before effect */}
        <div className="absolute top-[-50%] w-full h-full bg-[#ffce00] skew-y-[345deg] transition-all duration-500 group-hover:top-[-70%] group-hover:skew-y-[390deg] z-0" />

        <div className="relative flex justify-center items-center pt-5 z-10">
          <Image
            src={burgerImage}
            alt="Burger image"
            className="h-68 w-68 transition-all duration-500 group-hover:scale-150 "
            priority
          />
        </div>

        <div className="relative  flex flex-col justify-center items-center z-10">
          <p className="text-white text-2xl font-bold uppercase tracking-wider">
            {burger}
          </p>
          <p className="text-white text-lg  tracking-wider">{restaurant}</p>
          <p className="text-white text-2xl font-bold tracking-wider pt-2">
            {rating}/10
          </p>
          <Link href="/">
            <Button className="relative cursor-pointer mt-4 top-0 opacity-100 px-[32px] py-[16px] text-black no-underline bg-[#ffce00] rounded-lg uppercase tracking-wider transition-all duration-500 lg:top-[100px] lg:group-hover:top-0 lg:group-hover:opacity-100">
              Read more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
