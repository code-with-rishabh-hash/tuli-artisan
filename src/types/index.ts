// ═══════════════════════════════════════════════
// Tuli Artisan — Type Definitions
// ═══════════════════════════════════════════════

export type CraftType = "Block Printing" | "Brass Metalwork" | "Handloom Weaving";

export type ProductTag =
  | "Bestseller"
  | "New"
  | "Signature"
  | "Limited Edition"
  | "Heritage"
  | "Masterwork";

export interface Artisan {
  id: string;
  name: string;
  craft: CraftType;
  region: string;
  bio: string;
  story: string;
  quote: string;
  yearsOfPractice: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  artisanId: string;
  craft: CraftType;
  price: number;
  originalPrice: number | null;
  description: string;
  details: string[];
  careInstructions: string;
  timeToCreate: string;
  tag: ProductTag | null;
  colors: string[];
  inStock: boolean;
  image: string;
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  season: string;
  color: string;
  image: string;
  productIds: string[];
}

export interface Promotion {
  id: string;
  code: string | null;
  discount: number | null;
  type: "percentage" | "sale";
  description: string;
  applicableProducts: "all" | string[];
  active: boolean;
}

export interface CartItem extends Product {
  qty: number;
  selectedColor: string;
}

export type SortOption = "featured" | "price-low" | "price-high";
export type CraftFilter = "all" | CraftType;

export type TagVariant = "default" | "gold" | "outline" | "sale";
export type RevealDirection = "up" | "down" | "left" | "right" | "none" | "scale";
