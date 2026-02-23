import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const craft = searchParams.get("craft");
  const state = searchParams.get("state");
  const search = searchParams.get("search");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (craft && craft !== "all") {
    where.craft = craft;
  }
  if (state) {
    where.state = state;
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { craft: { contains: search } },
      { region: { contains: search } },
    ];
  }

  const artisans = await prisma.artisan.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(artisans, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
