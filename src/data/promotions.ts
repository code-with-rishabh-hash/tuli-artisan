import type { Promotion } from "@/types";

export const PROMOTIONS: Promotion[] = [
  {
    id: "promo-1",
    code: "FIRSTCRAFT",
    discount: 15,
    type: "percentage",
    description: "15% off your first order",
    applicableProducts: "all",
    active: true,
  },
  {
    id: "promo-2",
    code: null,
    discount: null,
    type: "sale",
    description: "Monsoon Sale",
    applicableProducts: ["bp-002", "bm-002"],
    active: true,
  },
];
