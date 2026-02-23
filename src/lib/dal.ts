// ═══════════════════════════════════════════════
// Tuli Artisan — Data Access Layer
// Uses Prisma when DATABASE_URL is set, otherwise falls back to mock data
// ═══════════════════════════════════════════════

import { cache } from "react";
import type {
  Product,
  Artisan,
  Collection,
  Promotion,
  ProductWithArtisan,
  ProductFilters,
  ArtisanFilters,
} from "@/types";
import { mockProducts, mockArtisans, mockCollections, mockPromotions } from "@/data/mock";

const IS_DEMO = !process.env.DATABASE_URL;

// ──────────────────────────────
// Helpers for JSON fields (SQLite stores arrays as JSON strings)
// ──────────────────────────────

function parseProduct(row: {
  id: string; slug: string; name: string; artisanId: string; craft: string;
  price: number; originalPrice: number | null; description: string; details: string;
  careInstructions: string; timeToCreate: string; tag: string | null;
  colors: string; inStock: boolean; image: string;
}): Product {
  return { ...row, details: JSON.parse(row.details) as string[], colors: JSON.parse(row.colors) as string[] } as Product;
}

function parseArtisan(row: {
  id: string; slug: string; name: string; craft: string; region: string; state: string;
  bio: string; story: string; quote: string; yearsOfPractice: number; image: string;
}): Artisan {
  return row as Artisan;
}

async function getPrisma() {
  const { prisma } = await import("./prisma");
  return prisma;
}

// ──────────────────────────────
// PRODUCT QUERIES
// ──────────────────────────────

export const getProducts = cache(async (filters?: ProductFilters): Promise<Product[]> => {
  if (IS_DEMO) {
    let results = [...mockProducts];
    if (filters?.craft) results = results.filter((p) => p.craft === filters.craft);
    if (filters?.artisan) results = results.filter((p) => p.artisanId === filters.artisan);
    if (filters?.state) {
      const artisanIds = mockArtisans.filter((a) => a.state === filters.state).map((a) => a.id);
      results = results.filter((p) => artisanIds.includes(p.artisanId));
    }
    if (filters?.minPrice) results = results.filter((p) => p.price >= filters.minPrice!);
    if (filters?.maxPrice) results = results.filter((p) => p.price <= filters.maxPrice!);
    if (filters?.search) {
      const term = filters.search.toLowerCase();
      results = results.filter((p) => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term) || p.craft.toLowerCase().includes(term));
    }
    if (filters?.sort === "price-low") results.sort((a, b) => a.price - b.price);
    else if (filters?.sort === "price-high") results.sort((a, b) => b.price - a.price);
    return results;
  }

  const prisma = await getPrisma();
  const where: Record<string, unknown> = {};
  if (filters?.craft) where.craft = filters.craft;
  if (filters?.artisan) where.artisanId = filters.artisan;
  if (filters?.state) where.artisan = { state: filters.state };
  if (filters?.minPrice || filters?.maxPrice) {
    where.price = { ...(filters.minPrice ? { gte: filters.minPrice } : {}), ...(filters.maxPrice ? { lte: filters.maxPrice } : {}) };
  }
  if (filters?.search) {
    const term = filters.search;
    where.OR = [{ name: { contains: term } }, { description: { contains: term } }, { craft: { contains: term } }];
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
  if (IS_DEMO) return mockProducts.find((p) => p.slug === slug) ?? null;
  const prisma = await getPrisma();
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? parseProduct(row) : null;
});

export const getProductById = cache(async (id: string): Promise<Product | null> => {
  if (IS_DEMO) return mockProducts.find((p) => p.id === id) ?? null;
  const prisma = await getPrisma();
  const row = await prisma.product.findUnique({ where: { id } });
  return row ? parseProduct(row) : null;
});

export const getProductWithArtisan = cache(async (slug: string): Promise<ProductWithArtisan | null> => {
  if (IS_DEMO) {
    const product = mockProducts.find((p) => p.slug === slug);
    if (!product) return null;
    const artisan = mockArtisans.find((a) => a.id === product.artisanId);
    if (!artisan) return null;
    return { ...product, artisan };
  }
  const prisma = await getPrisma();
  const row = await prisma.product.findUnique({ where: { slug }, include: { artisan: true } });
  if (!row) return null;
  return { ...parseProduct(row), artisan: parseArtisan(row.artisan) };
});

export const getProductsByArtisan = cache(async (artisanId: string): Promise<Product[]> => {
  if (IS_DEMO) return mockProducts.filter((p) => p.artisanId === artisanId);
  const prisma = await getPrisma();
  const rows = await prisma.product.findMany({ where: { artisanId } });
  return rows.map(parseProduct);
});

// ──────────────────────────────
// ARTISAN QUERIES
// ──────────────────────────────

export const getArtisans = cache(async (filters?: ArtisanFilters): Promise<Artisan[]> => {
  if (IS_DEMO) {
    let results = [...mockArtisans];
    if (filters?.craft) results = results.filter((a) => a.craft === filters.craft);
    if (filters?.state) results = results.filter((a) => a.state === filters.state);
    if (filters?.search) {
      const term = filters.search.toLowerCase();
      results = results.filter((a) => a.name.toLowerCase().includes(term) || a.craft.toLowerCase().includes(term) || a.region.toLowerCase().includes(term));
    }
    return results;
  }
  const prisma = await getPrisma();
  const where: Record<string, unknown> = {};
  if (filters?.craft) where.craft = filters.craft;
  if (filters?.state) where.state = filters.state;
  if (filters?.search) {
    const term = filters.search;
    where.OR = [{ name: { contains: term } }, { craft: { contains: term } }, { region: { contains: term } }];
  }
  const rows = await prisma.artisan.findMany({
    where: where as Parameters<typeof prisma.artisan.findMany>[0] extends { where?: infer W } ? W : never,
    orderBy: { createdAt: "desc" },
  });
  return rows.map(parseArtisan);
});

export const getArtisan = cache(async (slug: string): Promise<Artisan | null> => {
  if (IS_DEMO) return mockArtisans.find((a) => a.slug === slug) ?? null;
  const prisma = await getPrisma();
  const row = await prisma.artisan.findUnique({ where: { slug } });
  return row ? parseArtisan(row) : null;
});

export const getArtisanById = cache(async (id: string): Promise<Artisan | null> => {
  if (IS_DEMO) return mockArtisans.find((a) => a.id === id) ?? null;
  const prisma = await getPrisma();
  const row = await prisma.artisan.findUnique({ where: { id } });
  return row ? parseArtisan(row) : null;
});

// ──────────────────────────────
// COLLECTION QUERIES
// ──────────────────────────────

export const getCollections = cache(async (): Promise<Collection[]> => {
  if (IS_DEMO) return mockCollections;
  const prisma = await getPrisma();
  const rows = await prisma.collection.findMany({
    include: { products: { select: { productId: true }, orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
  return rows.map((row) => ({
    id: row.id, slug: row.slug, title: row.title, subtitle: row.subtitle,
    description: row.description, season: row.season, color: row.color, image: row.image,
    productIds: row.products.map((p) => p.productId),
  }));
});

export const getCollection = cache(async (slug: string): Promise<Collection | null> => {
  if (IS_DEMO) return mockCollections.find((c) => c.slug === slug) ?? null;
  const prisma = await getPrisma();
  const row = await prisma.collection.findUnique({
    where: { slug },
    include: { products: { select: { productId: true }, orderBy: { sortOrder: "asc" } } },
  });
  if (!row) return null;
  return {
    id: row.id, slug: row.slug, title: row.title, subtitle: row.subtitle,
    description: row.description, season: row.season, color: row.color, image: row.image,
    productIds: row.products.map((p) => p.productId),
  };
});

export const getCollectionProducts = cache(async (slug: string): Promise<Product[]> => {
  if (IS_DEMO) {
    const collection = mockCollections.find((c) => c.slug === slug);
    if (!collection) return [];
    return collection.productIds.map((id) => mockProducts.find((p) => p.id === id)).filter(Boolean) as Product[];
  }
  const prisma = await getPrisma();
  const collection = await prisma.collection.findUnique({
    where: { slug },
    include: { products: { include: { product: true }, orderBy: { sortOrder: "asc" } } },
  });
  if (!collection) return [];
  return collection.products.map((cp) => parseProduct(cp.product));
});

// ──────────────────────────────
// PROMOTION QUERIES
// ──────────────────────────────

export const getProductPromo = cache(async (productSlug: string): Promise<Promotion | null> => {
  if (IS_DEMO) {
    const match = mockPromotions.find((p) => {
      if (p.applicableProducts === "all") return true;
      if (Array.isArray(p.applicableProducts)) return p.applicableProducts.includes(productSlug);
      return false;
    });
    return match ?? null;
  }
  const prisma = await getPrisma();
  const product = await prisma.product.findUnique({ where: { slug: productSlug } });
  if (!product) return null;
  const promos = await prisma.promotion.findMany({ where: { active: true } });
  const match = promos.find((p) => {
    if (p.applicableProducts === "all") return true;
    try { return (JSON.parse(p.applicableProducts) as string[]).includes(product.slug); } catch { return false; }
  });
  if (!match) return null;
  return {
    id: match.id, code: match.code, discount: match.discount,
    type: match.type as "percentage" | "sale", description: match.description,
    applicableProducts: match.applicableProducts === "all" ? "all" : (JSON.parse(match.applicableProducts) as string[]),
    active: match.active,
  };
});

export const getPromotions = cache(async (): Promise<Promotion[]> => {
  if (IS_DEMO) return mockPromotions;
  const prisma = await getPrisma();
  const rows = await prisma.promotion.findMany({ where: { active: true } });
  return rows.map((row) => ({
    id: row.id, code: row.code, discount: row.discount,
    type: row.type as "percentage" | "sale", description: row.description,
    applicableProducts: row.applicableProducts === "all" ? ("all" as const) : (JSON.parse(row.applicableProducts) as string[]),
    active: row.active,
  }));
});

// ──────────────────────────────
// AGGREGATE QUERIES (for filters)
// ──────────────────────────────

export const getDistinctCrafts = cache(async (): Promise<string[]> => {
  if (IS_DEMO) return [...new Set(mockProducts.map((p) => p.craft))].sort();
  const prisma = await getPrisma();
  const rows = await prisma.product.findMany({ select: { craft: true }, distinct: ["craft"], orderBy: { craft: "asc" } });
  return rows.map((r) => r.craft);
});

export const getDistinctStates = cache(async (): Promise<string[]> => {
  if (IS_DEMO) return [...new Set(mockArtisans.map((a) => a.state))].sort();
  const prisma = await getPrisma();
  const rows = await prisma.artisan.findMany({ select: { state: true }, distinct: ["state"], orderBy: { state: "asc" } });
  return rows.map((r) => r.state);
});

export const getPriceRange = cache(async (): Promise<{ min: number; max: number }> => {
  if (IS_DEMO) {
    const prices = mockProducts.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }
  const prisma = await getPrisma();
  const result = await prisma.product.aggregate({ _min: { price: true }, _max: { price: true } });
  return { min: result._min.price ?? 0, max: result._max.price ?? 10000 };
});

export const getArtisanList = cache(async (): Promise<{ id: string; slug: string; name: string; craft: string }[]> => {
  if (IS_DEMO) return mockArtisans.map((a) => ({ id: a.id, slug: a.slug, name: a.name, craft: a.craft }));
  const prisma = await getPrisma();
  return prisma.artisan.findMany({ select: { id: true, slug: true, name: true, craft: true }, orderBy: { name: "asc" } });
});
