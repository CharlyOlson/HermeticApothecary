import type { Metadata } from "next";
import { HouseOfHeathensLanding } from "@/components/HouseOfHeathensLanding";

export const metadata: Metadata = {
  title: "House of Heathens, Harlots and Heretics — 18+ Verified",
  description:
    "The adults-only side room of Hermetic Apothecary: an 18+ verified landing page for after-dark drops, adult customs, and provocative occult art.",
};

export default function HouseOfHeathensPage() {
  return <HouseOfHeathensLanding />;
}
