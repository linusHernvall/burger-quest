export default function Footer() {
  return (
    <footer>
      <div
        className=" h-100 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/footer.png')" }}
      ></div>
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-sm text-black ">
          &copy; {new Date().getFullYear()} Burger Quest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
