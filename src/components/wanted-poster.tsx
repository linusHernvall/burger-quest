import Image from "next/image";
import { AdminActions } from "./admin-actions";

interface WantedPosterProps {
  burgerName: string;
  restaurant: string;
  createdAt: string;
  imageUrl: string;
  description: string;
  rating: number;
  isHighestRated: boolean;
  isUniqueHighest: boolean;
  burgerId: string;
}

export function WantedPoster({
  burgerName,
  restaurant,
  createdAt,
  imageUrl,
  description,
  rating,
  isHighestRated,
  isUniqueHighest,
  burgerId,
}: WantedPosterProps) {
  return (
    <div
      className="relative w-full max-w-2xl mx-auto aspect-[3/4] flex flex-col items-center justify-between p-0 bg-contain bg-no-repeat bg-center "
      style={{ backgroundImage: "url('/wanted-poster.png')" }}
    >
      <div className="flex flex-col items-center w-full pt-20 px-6">
        <h1 className="text-4xl md:text-5xl text-black text-center mb-2">
          {burgerName.toUpperCase()}
        </h1>
        <p
          className="text-xl md:text-3xl text-center mb-2 text-black"
          style={{ fontFamily: "var(--font-rye)" }}
        >
          {restaurant}
        </p>
        {/* <div className="text-base text-center italic mb-2">
          Last seen: {createdAt}
        </div> */}
      </div>
      <div className="flex flex-col items-center w-full px-6">
        <div className="relative w-full flex justify-center my-2">
          <div className="relative w-64 h-40 md:w-80 md:h-52 lg:w-160 lg:h-128">
            <Image
              src={imageUrl}
              alt={`Burger: ${burgerName}`}
              fill
              className="object-contain drop-shadow-xl rounded-md"
              priority
            />
          </div>
          {isHighestRated && (
            <div className="absolute top-0 right-16 transform rotate-12 z-20">
              <Image
                src={isUniqueHighest ? "/sheriff.png" : "/deputy.png"}
                alt={isUniqueHighest ? "Sheriff badge" : "Deputy badge"}
                width={64}
                height={64}
                className="drop-shadow-lg lg:w-24 lg:h-24"
                priority
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center w-full px-6 mt-2">
        <h2 className="text-3xl text-black mb-2 text-center">Beskrivning</h2>
        <p className="text-base text-black text-center mb-8">{description}</p>
      </div>
      <div className="flex flex-col items-center w-full px-6 mb-10">
        <p className="text-2xl text-black mb-1">Betyg</p>
        <p className="text-3xl text-black mb-2">★ {rating} av 10 ★</p>
        <AdminActions burgerId={burgerId} burgerName={burgerName} />
      </div>
    </div>
  );
}
