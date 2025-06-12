import CardGrid from "@/components/cardGrid";
import { AddBurgerButton } from "@/components/add-burger-button";
import ToastClientWrapper from "@/components/toastClientWrapper";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl py-10 px-4 md:py-20 xl:container">
      <h1 className="text-4xl pb-8 font-bold">Welcome to Burger Quest!</h1>
      <p className="pb-4">
        Watch a burger battle unfold as we try to find the best burger.
      </p>
      <AddBurgerButton />
      <ToastClientWrapper />
      <CardGrid />
    </div>
  );
}
