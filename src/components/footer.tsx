export default function Footer() {
  return (
    <footer className="bg-background/50 backdrop-blur-sm ">
      <div
        className=" h-100 bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/desert.png')" }}
      ></div>
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Burger Quest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
