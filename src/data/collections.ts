import { IMAGES } from "./images";
import { getProduct } from "./products";
import type { Collection, Product } from "@/types";

export const COLLECTIONS: Collection[] = [
  {
    id: "monsoon-edit",
    title: "The Monsoon Edit",
    subtitle: "Rain-inspired indigos & earthy textures",
    description:
      "A curated collection celebrating the poetry of the Indian monsoon \u2014 deep indigos, rain-washed greys, and the rich earth tones that emerge when the first drops meet dry soil.",
    season: "Monsoon 2026",
    color: "#1a3a4a",
    image: IMAGES.monsoon,
    productIds: ["bp-001", "hw-001", "bm-002"],
  },
  {
    id: "first-light",
    title: "First Light",
    subtitle: "Dawn-inspired brass & warm textiles",
    description:
      "Pieces that capture the golden warmth of early morning \u2014 hand-polished brass that catches light like sunrise, and textiles in saffron, turmeric, and soft cream.",
    season: "Spring 2026",
    color: "#8B6914",
    image: IMAGES.dawn,
    productIds: ["bm-001", "hw-002", "bp-002"],
  },
  {
    id: "earth-altar",
    title: "Earth & Altar",
    subtitle: "Sacred geometry in everyday objects",
    description:
      "Where devotion meets daily life. Temple-inspired patterns in brass, cloth, and natural dyes \u2014 objects that transform mundane rituals into moments of quiet reverence.",
    season: "Year-round",
    color: "#5C3D2E",
    image: IMAGES.earth,
    productIds: ["bm-001", "bp-001", "hw-001"],
  },
];

export function getCollection(id: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}

export function getCollectionProducts(collection: Collection): Product[] {
  return collection.productIds.map(getProduct).filter((p): p is Product => p !== undefined);
}
