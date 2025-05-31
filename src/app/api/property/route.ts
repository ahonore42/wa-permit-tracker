import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const parcelId = searchParams.get("parcelId");

  if (!address && !parcelId) {
    return NextResponse.json(
      { error: "Address or parcelId parameter required" },
      { status: 400 }
    );
  }

  try {
    let property = null;

    // Search by parcel ID first if provided
    if (parcelId) {
      property = await prisma.property.findFirst({
        where: { parcelId },
        include: {
          projects: {
            include: {
              deadlines: {
                where: { isActive: true },
                orderBy: { date: "asc" },
              },
              documents: true,
            },
          },
        },
      });
    }

    // If not found by parcel ID, search by address
    if (!property && address) {
      property = await prisma.property.findFirst({
        where: {
          address: {
            contains: address,
            mode: "insensitive",
          },
        },
        include: {
          projects: {
            include: {
              deadlines: {
                where: { isActive: true },
                orderBy: { date: "asc" },
              },
              documents: true,
            },
          },
        },
      });
    }

    if (property) {
      return NextResponse.json(property);
    }

    // Property not found - suggest creating new entry
    return NextResponse.json(
      {
        found: false,
        message: "Property not found in database.",
        suggestion: "You can add this property to start tracking permits.",
        searchTerm: address || parcelId,
        actions: {
          addProperty: "/api/property",
          checkThurstonCounty:
            "https://www.thurstoncountywa.gov/departments/community-planning-and-economic-development/permitting/project-status",
        },
      },
      { status: 404 }
    );
  } catch (error) {
    console.error("Property lookup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, jurisdiction, latitude, longitude, parcelId, zoning } =
      body;

    // Validate required fields
    if (!address || !jurisdiction) {
      return NextResponse.json(
        { error: "Address and jurisdiction are required" },
        { status: 400 }
      );
    }

    // Check if property already exists
    const existingProperty = await prisma.property.findFirst({
      where: {
        OR: [
          { address: { equals: address, mode: "insensitive" } },
          ...(parcelId ? [{ parcelId }] : []),
        ],
      },
    });

    if (existingProperty) {
      return NextResponse.json(
        { error: "Property already exists", property: existingProperty },
        { status: 409 }
      );
    }

    const property = await prisma.property.create({
      data: {
        address,
        jurisdiction,
        latitude,
        longitude,
        parcelId,
        zoning,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Property creation error:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}
