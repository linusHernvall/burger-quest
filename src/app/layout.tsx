import type { Metadata } from "next";
import { Geist, Geist_Mono, Rye, Special_Elite } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
            className="fixed inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/desert.png')" }}
          />
          <div className="relative z-10 min-h-[100dvh]">
            <Header />
            {children}
            <Footer />
            <Toaster />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
