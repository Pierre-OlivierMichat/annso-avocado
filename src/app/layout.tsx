import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnimationProvider from "@/components/AnimationProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Annso Avocado",
  description: "Annso Avocado — Vêtements de fitness haut de gamme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased" suppressHydrationWarning>
        <AnimationProvider>
          <Navbar />
          <main id="main-content">{children}</main>
        </AnimationProvider>
      </body>
    </html>
  );
}
