import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { users } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const user_id = parseInt(req.url.slice(req.url.lastIndexOf("/") + 1));
    if (!user_id) {
      return NextResponse.json(
        { error: "user_id is required" },
        { status: 400 }
      );
    }
    const user = await prisma.users.findUnique({
      where: { user_id },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user_id = parseInt(req.url.slice(req.url.lastIndexOf("/") + 1));
    const { first_name, last_name, profile_url }: Partial<users> =
      await req.json();

    if (!user_id || !first_name || !last_name || !profile_url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const updatedUser = await prisma.users.update({
      where: { user_id },
      data: { first_name, last_name, profile_url },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
