import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { users } from "@prisma/client";

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
