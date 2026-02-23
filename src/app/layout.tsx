import { cookies } from "next/headers";
import { Cormorant_Garamond, Karla } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { THEME_COOKIE_NAME } from "@/lib/theme";
import type { Theme } from "@/lib/theme";
import type { Metadata } from "next";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tuli Artisan \u2014 Handcrafted by India\u2019s Finest",
    template: "%s | Tuli Artisan",
  },
  description:
    "Connecting you directly to India\u2019s finest artisans. Every purchase sustains a centuries-old craft tradition.",
  keywords: "artisan, handcrafted, Indian crafts, block printing, brass, handloom, ikat",
  openGraph: {
    title: "Tuli Artisan",
    description: "Where Craft Becomes Legacy",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE_NAME)?.value;
  const theme: Theme = themeCookie === "dark" ? "dark" : "light";

  return (
    <html
      lang="en"
      data-theme={theme}
      className={`${cormorant.variable} ${karla.variable}`}
    >
      <body
        style={{
          fontFamily: 'var(--font-karla, "Karla", sans-serif)',
          minHeight: "100vh",
        }}
      >
        <ThemeProvider initialTheme={theme}>
          <CartProvider>
            <GrainOverlay />
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
