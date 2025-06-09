import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 xl:container">
        <Link href="/">
          <p className="text-2xl text-black font-bold cursor-pointer">
            Burger Quest
          </p>
        </Link>
      </div>
    </header>
  );
}
