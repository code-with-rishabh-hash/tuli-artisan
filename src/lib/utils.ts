// ═══════════════════════════════════════════════
// Tuli Artisan — Utility Functions
// ═══════════════════════════════════════════════

/** Format price in Indian Rupee locale */
export function formatPrice(price: number): string {
  return `\u20B9${price.toLocaleString("en-IN")}`;
}
