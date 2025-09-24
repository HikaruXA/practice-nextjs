import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const user_id = parseInt(req.url.slice(req.url.lastIndexOf("/") + 1));

    if (!user_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const deletedUser = await prisma.users.update({
      where: { user_id },
      data: { deleted_at: new Date(), is_deleted: true },
    });
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
