import type { Metadata } from "next";
import { Geist, Geist_Mono, Rye, Special_Elite } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import Header from "@/components/header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const rye = Rye({
  variable: "--font-rye",
  subsets: ["latin"],
  weight: "400",
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Burger Quest",
  description: "Track and rate your burger adventures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rye.variable} ${specialElite.variable} antialiased`}>
        <AuthProvider>
          <div
            className=" relative min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/wood.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/40 z-0" />
            <div className="relative z-10">
              <Header />
              {children}
              <Toaster />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
