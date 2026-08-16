import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const craft = searchParams.get("craft");
  const artisan = searchParams.get("artisan");
  const state = searchParams.get("state");
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (craft && craft !== "all") {
    where.craft = craft;
  }
  if (artisan) {
    where.artisanId = artisan;
  }
  if (state) {
    where.artisan = { state };
  }
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
      { craft: { contains: search } },
    ];
  }

  let orderBy: Record<string, string> = {};
  if (sort === "price-low") orderBy = { price: "asc" };
  else if (sort === "price-high") orderBy = { price: "desc" };
  else orderBy = { createdAt: "desc" };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: { artisan: { select: { slug: true, name: true, region: true, state: true } } },
  });

  const parsed = products.map((p) => ({
    ...p,
    details: JSON.parse(p.details),
    colors: JSON.parse(p.colors),
  }));

  return NextResponse.json(parsed, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
