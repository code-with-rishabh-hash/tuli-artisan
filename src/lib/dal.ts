// ═══════════════════════════════════════════════
// Tuli Artisan — Data Access Layer
// Replaces all @/data/* imports with Prisma queries
// ═══════════════════════════════════════════════

import { cache } from "react";
import { prisma } from "./prisma";
import type {
  Product,
  Artisan,
  Collection,
  Promotion,
  ProductWithArtisan,
  ProductFilters,
  ArtisanFilters,
} from "@/types";

// ──────────────────────────────
// Helpers for JSON fields (SQLite stores arrays as JSON strings)
// ──────────────────────────────

function parseProduct(row: {
  id: string;
  slug: string;
  name: string;
  artisanId: string;
  craft: string;
  price: number;
  originalPrice: number | null;
  description: string;
  details: string;
  careInstructions: string;
  timeToCreate: string;
  tag: string | null;
  colors: string;
  inStock: boolean;
  image: string;
}): Product {
  return {
    ...row,
    details: JSON.parse(row.details) as string[],
    colors: JSON.parse(row.colors) as string[],
  } as Product;
}

function parseArtisan(row: {
  id: string;
  slug: string;
  name: string;
  craft: string;
  region: string;
  state: string;
  bio: string;
  story: string;
  quote: string;
  yearsOfPractice: number;
  image: string;
}): Artisan {
  return row as Artisan;
}

// ──────────────────────────────
// PRODUCT QUERIES
// ──────────────────────────────

export const getProducts = cache(async (filters?: ProductFilters): Promise<Product[]> => {
  const where: Record<string, unknown> = {};

  if (filters?.craft) {
    where.craft = filters.craft;
  }
  if (filters?.artisan) {
    where.artisanId = filters.artisan;
  }
  if (filters?.state) {
    where.artisan = { state: filters.state };
  }
  if (filters?.minPrice || filters?.maxPrice) {
    where.price = {
      ...(filters.minPrice ? { gte: filters.minPrice } : {}),
      ...(filters.maxPrice ? { lte: filters.maxPrice } : {}),
    };
  }
  if (filters?.search) {
    const term = filters.search;
    where.OR = [
      { name: { contains: term } },
      { description: { contains: term } },
      { craft: { contains: term } },
    ];
  }

  let orderBy: Record<string, string> = {};
  if (filters?.sort === "price-low") orderBy = { price: "asc" };
  else if (filters?.sort === "price-high") orderBy = { price: "desc" };
  else orderBy = { createdAt: "desc" };

  const rows = await prisma.product.findMany({
    where: where as Parameters<typeof prisma.product.findMany>[0] extends { where?: infer W } ? W : never,
    orderBy,
  });

  return rows.map(parseProduct);
});

export const getProduct = cache(async (slug: string): Promise<Product | null> => {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? parseProduct(row) : null;
});

export const getProductById = cache(async (id: string): Promise<Product | null> => {
  const row = await prisma.product.findUnique({ where: { id } });
  return row ? parseProduct(row) : null;
});

export const getProductWithArtisan = cache(async (slug: string): Promise<ProductWithArtisan | null> => {
  const row = await prisma.product.findUnique({
    where: { slug },
    include: { artisan: true },
  });
  if (!row) return null;
  return {
    ...parseProduct(row),
    artisan: parseArtisan(row.artisan),
  };
});

export const getProductsByArtisan = cache(async (artisanId: string): Promise<Product[]> => {
  const rows = await prisma.product.findMany({ where: { artisanId } });
  return rows.map(parseProduct);
});

// ──────────────────────────────
// ARTISAN QUERIES
// ──────────────────────────────

export const getArtisans = cache(async (filters?: ArtisanFilters): Promise<Artisan[]> => {
  const where: Record<string, unknown> = {};

  if (filters?.craft) {
    where.craft = filters.craft;
  }
  if (filters?.state) {
    where.state = filters.state;
  }
  if (filters?.search) {
    const term = filters.search;
    where.OR = [
      { name: { contains: term } },
      { craft: { contains: term } },
      { region: { contains: term } },
    ];
  }

  const rows = await prisma.artisan.findMany({
    where: where as Parameters<typeof prisma.artisan.findMany>[0] extends { where?: infer W } ? W : never,
    orderBy: { createdAt: "desc" },
  });

  return rows.map(parseArtisan);
});

export const getArtisan = cache(async (slug: string): Promise<Artisan | null> => {
  const row = await prisma.artisan.findUnique({ where: { slug } });
  return row ? parseArtisan(row) : null;
});

export const getArtisanById = cache(async (id: string): Promise<Artisan | null> => {
  const row = await prisma.artisan.findUnique({ where: { id } });
  return row ? parseArtisan(row) : null;
});

// ──────────────────────────────
// COLLECTION QUERIES
// ──────────────────────────────

export const getCollections = cache(async (): Promise<Collection[]> => {
  const rows = await prisma.collection.findMany({
    include: { products: { select: { productId: true }, orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    season: row.season,
    color: row.color,
    image: row.image,
    productIds: row.products.map((p) => p.productId),
  }));
});

export const getCollection = cache(async (slug: string): Promise<Collection | null> => {
  const row = await prisma.collection.findUnique({
    where: { slug },
    include: { products: { select: { productId: true }, orderBy: { sortOrder: "asc" } } },
  });

  if (!row) return null;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    season: row.season,
    color: row.color,
    image: row.image,
    productIds: row.products.map((p) => p.productId),
  };
});

export const getCollectionProducts = cache(async (slug: string): Promise<Product[]> => {
  const collection = await prisma.collection.findUnique({
    where: { slug },
    include: {
      products: {
        include: { product: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!collection) return [];
  return collection.products.map((cp) => parseProduct(cp.product));
});

// ──────────────────────────────
// PROMOTION QUERIES
// ──────────────────────────────

export const getProductPromo = cache(async (productSlug: string): Promise<Promotion | null> => {
  const product = await prisma.product.findUnique({ where: { slug: productSlug } });
  if (!product) return null;

  const promos = await prisma.promotion.findMany({ where: { active: true } });
  const match = promos.find((p) => {
    const applicable = p.applicableProducts;
    if (applicable === "all") return true;
    try {
      const ids = JSON.parse(applicable) as string[];
      return ids.includes(product.slug);
    } catch {
      return false;
    }
  });

  if (!match) return null;

  return {
    id: match.id,
    code: match.code,
    discount: match.discount,
    type: match.type as "percentage" | "sale",
    description: match.description,
    applicableProducts: match.applicableProducts === "all"
      ? "all"
      : (JSON.parse(match.applicableProducts) as string[]),
    active: match.active,
  };
});

export const getPromotions = cache(async (): Promise<Promotion[]> => {
  const rows = await prisma.promotion.findMany({ where: { active: true } });
  return rows.map((row) => ({
    id: row.id,
    code: row.code,
    discount: row.discount,
    type: row.type as "percentage" | "sale",
    description: row.description,
    applicableProducts: row.applicableProducts === "all"
      ? ("all" as const)
      : (JSON.parse(row.applicableProducts) as string[]),
    active: row.active,
  }));
});

// ──────────────────────────────
// AGGREGATE QUERIES (for filters)
// ──────────────────────────────

export const getDistinctCrafts = cache(async (): Promise<string[]> => {
  const rows = await prisma.product.findMany({
    select: { craft: true },
    distinct: ["craft"],
    orderBy: { craft: "asc" },
  });
  return rows.map((r) => r.craft);
});

export const getDistinctStates = cache(async (): Promise<string[]> => {
  const rows = await prisma.artisan.findMany({
    select: { state: true },
    distinct: ["state"],
    orderBy: { state: "asc" },
  });
  return rows.map((r) => r.state);
});

export const getPriceRange = cache(async (): Promise<{ min: number; max: number }> => {
  const result = await prisma.product.aggregate({
    _min: { price: true },
    _max: { price: true },
  });
  return {
    min: result._min.price ?? 0,
    max: result._max.price ?? 10000,
  };
});

export const getArtisanList = cache(async (): Promise<{ id: string; slug: string; name: string; craft: string }[]> => {
  return prisma.artisan.findMany({
    select: { id: true, slug: true, name: true, craft: true },
    orderBy: { name: "asc" },
  });
});
