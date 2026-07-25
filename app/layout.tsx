import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import SmoothScroll from "./components/SmoothScroll";
import MatchClock from "./components/match/MatchClock";
import Grain from "./components/ui/Grain";

/** Display face — compressed grotesque, already in the repo and never used until now. */
const talisman = localFont({
  src: [
    { path: "./fonts/PPTalisman-Compressed-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/PPTalisman-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-talisman",
  display: "swap",
});

const montserrat = localFont({
  src: [
    { path: "./fonts/Montserrat/Montserrat-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Montserrat/Montserrat-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Montserrat/Montserrat-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Montserrat/Montserrat-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NINETY — one match, ninety minutes, everything football is",
  description:
    "Scroll is the match clock. Ninety minutes through football's greatest moments, a career drawn as a line, a penalty you take yourself, and an argument you settle.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${talisman.variable} ${montserrat.variable} ${mono.variable}`}
    >
      <body suppressHydrationWarning>
        <Grain />
        <MatchClock />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
