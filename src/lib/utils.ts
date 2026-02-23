// ═══════════════════════════════════════════════
// Tuli Artisan — Utility Functions
// ═══════════════════════════════════════════════

import { PROMOTIONS } from "@/data/promotions";
import type { Promotion } from "@/types";

/** Format price in Indian Rupee locale */
export function formatPrice(price: number): string {
  return `\u20B9${price.toLocaleString("en-IN")}`;
}

/** Find active sale promotion for a product */
export function getProductPromo(productId: string): Promotion | undefined {
  return PROMOTIONS.find(
    (p) =>
      p.active &&
      p.type === "sale" &&
      (p.applicableProducts === "all" || p.applicableProducts.includes(productId))
  );
}
