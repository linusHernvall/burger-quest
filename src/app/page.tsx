import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl py-10 px-4 md:py-20">
      <h1 className="text-4xl pb-8 font-bold">Welcome to Burger Quest!</h1>
      <p className=" pb-4 text-gray-500">
        Watch a burger battle unfold as we try to find the best burger.
      </p>
      <Link href="/add-burger">
        <Button className="cursor-pointer">Add Burger</Button>
      </Link>
    </div>
  );
}
