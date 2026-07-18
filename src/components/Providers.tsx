"use client";
import { type ReactNode } from "react";
import { CartProvider } from "./CartProvider";
import { CartDrawer } from "./CartDrawer";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
