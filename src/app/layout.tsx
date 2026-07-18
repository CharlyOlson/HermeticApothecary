import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "Hermetic Apothecary — Sacred Objects for the Beautifully Damned",
    template: "%s · Hermetic Apothecary",
  },
  description:
    "Art prints, resin relics, custom tees, ouija boards, jewelry, and novelty for the modern mystic. Handmade, visually striking, deep in meaning.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
