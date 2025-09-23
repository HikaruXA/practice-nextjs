import { NextResponse } from "next/server";
import { users } from "@prisma/client";
import prisma from "@/lib/prisma";

// TODO: Add authentication and authorization to restrict access to authenticated users only
export async function GET() {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
// TODO: Add authentication and authorization to restrict access to users themselves only
export async function PUT(req: Request) {
  try {
    const { user_id, first_name, last_name, profile_url }: users =
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
