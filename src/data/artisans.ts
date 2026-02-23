import { IMAGES } from "./images";
import type { Artisan } from "@/types";

export const ARTISANS: Artisan[] = [
  {
    id: "meera-devi",
    name: "Meera Devi",
    craft: "Block Printing",
    region: "Jaipur, Rajasthan",
    bio: "Third-generation block printer preserving 400-year-old Sanganer traditions. Each piece takes 3\u20137 days of meticulous hand-stamping with carved teak blocks.",
    story: "Meera learned the art of block printing at age eight, sitting beside her grandmother in their courtyard workshop. Today, she leads a collective of twelve women artisans, each carrying forward patterns that have been in their families for generations. Her signature indigo dyes are made from natural neel plants, crushed and fermented for forty days.",
    quote: "Every imperfection in a hand-printed textile is proof that a human being cared enough to create it.",
    yearsOfPractice: 28,
    image: IMAGES.artisan1,
  },
  {
    id: "rajan-kumar",
    name: "Rajan Kumar",
    craft: "Brass Metalwork",
    region: "Moradabad, Uttar Pradesh",
    bio: "Master metalsmith creating contemporary vessels using ancient lost-wax casting methods passed down through five generations.",
    story: "In the narrow lanes of Moradabad, known as Peetal Nagri \u2014 the City of Brass \u2014 Rajan\u2019s workshop hums with the rhythm of hammers on metal. Each vessel begins as a wax model, hand-sculpted, then encased in clay. When the mold is fired, the wax melts away, leaving space for molten brass to fill. No two pieces are ever identical.",
    quote: "Brass remembers the hand that shaped it. That memory lives in every curve.",
    yearsOfPractice: 35,
    image: IMAGES.artisan2,
  },
  {
    id: "lakshmi-bai",
    name: "Lakshmi Bai",
    craft: "Handloom Weaving",
    region: "Pochampally, Telangana",
    bio: "Ikat weaving master creating mesmerizing geometric patterns through resist-dyeing threads before they meet the loom.",
    story: "The click-clack of Lakshmi\u2019s loom begins before dawn and continues well past dusk. Pochampally Ikat \u2014 a UNESCO heritage craft \u2014 demands extraordinary precision: each thread is tied and dyed in exact patterns before weaving begins. A single saree can take three weeks. Lakshmi\u2019s patterns draw from temple architecture and the geometry of rice paddies.",
    quote: "The loom is my language. Every thread is a word, every pattern a story only cloth can tell.",
    yearsOfPractice: 40,
    image: IMAGES.artisan3,
  },
];

export function getArtisan(id: string): Artisan | undefined {
  return ARTISANS.find((a) => a.id === id);
}
