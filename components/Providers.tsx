"use client";

import type { ReactNode } from "react";
import { CartProvider } from "./CartProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
