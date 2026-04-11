import type { Metadata } from "next";
import { Dancing_Script, Space_Grotesk, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = localFont({
  src: [
    {
      path: "./fonts/Montserrat/Montserrat-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat/Montserrat-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat/Montserrat-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat/Montserrat-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat/Montserrat-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "The Beautiful Game® | Football Culture & Stats Hub",
  description: "The Beautiful Game is your ultimate destination for football culture — leagues, legends, rising stars, live stats, and the passion that moves the world.",
};

import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/ui/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable} ${montserrat.variable} ${dancingScript.variable}`}>
      <body
        className="font-sans antialiased bg-white text-black cursor-none"
        suppressHydrationWarning
      >
        <CustomCursor />
        <SmoothScroll>
          {/* Global Texture Overlay */}
          <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10] pointer-events-none mix-blend-multiply z-[9999]"></div>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
