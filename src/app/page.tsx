import Link from "next/link";

import { Button } from "@/components/button";
import CardGrid from "@/components/cardGrid";
import ToastClientWrapper from "@/components/toastClientWrapper";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl py-10 px-4 md:py-20 xl:container">
      <h1 className="text-4xl pb-8 font-bold">Welcome to Burger Quest!</h1>
      <p className="pb-4 text-gray-500">
        Watch a burger battle unfold as we try to find the best burger.
      </p>
      <Link href="/add-burger">
        <Button className="cursor-pointer">Add Burger</Button>
      </Link>
      <ToastClientWrapper />
      <CardGrid />
    </div>
  );
}
