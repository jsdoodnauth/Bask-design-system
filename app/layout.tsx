import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { BaskMotionProvider } from "@/lib/motion/bask-motion-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Bask",
  description: "Bask — a carved design system.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(inter.variable, fraunces.variable)}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-surface focus:text-ink focus:font-semibold focus:text-[length:var(--fs-14)]"
          style={{ boxShadow: "var(--elev-2)" }}
        >
          Skip to main content
        </a>
        <BaskMotionProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </BaskMotionProvider>
      </body>
    </html>
  );
}
