import Link from "next/link";

import { Button } from "./button";
import Image from "next/image";

interface BurgerCardProps {
  burgerName: string;
  restaurantName: string;
  rating: number;
  image: string;
}

export default function BurgerCard({
  burgerName,
  restaurantName,
  rating,
  image,
}: BurgerCardProps) {
  return (
    <div>
      <div className="relative w-[320px] h-[480px] bg-[#404040] rounded-lg overflow-hidden group">
        {/* ::before effect */}
        <div className="absolute top-[-50%] w-full h-full bg-[#ffce00] skew-y-[345deg] transition-all duration-500 group-hover:top-[-70%] group-hover:skew-y-[390deg] z-0" />

        {/* ::after effect */}
        {/* <div className="absolute bottom-0 left-6 font-semibold text-[5em] text-black/10 z-0">
          BQ
        </div> */}

        <div className="relative flex justify-center items-center pt-5 z-10">
          <img
            src="https://www.corsair.com/corsairmedia/sys_master/productcontent/CH-9300011-NA-M65_PRO_RGB_BLK_04.png"
            alt="mouse corsair"
            className="h-[272px] w-auto transition-all duration-500 group-hover:max-w-[50%]"
          />
        </div>

        <div className="relative  flex flex-col justify-center items-center z-10">
          <p className="text-white text-2xl font-bold uppercase tracking-wider">
            Burger Name
          </p>
          <p className="text-white text-lg  tracking-wider">Restaurant Name</p>
          <p className="text-white text-2xl font-bold tracking-wider pt-2">
            8/10
          </p>
          <Link href="/">
            <Button className="relative cursor-pointer mt-4 top-[100px] opacity-0 px-[30px] py-[10px] text-black no-underline bg-[#ffce00] rounded-lg uppercase tracking-wider transition-all duration-500 group-hover:top-0 group-hover:opacity-100">
              Read more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
