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

    const restoredUser = await prisma.users.update({
      where: { user_id },
      data: { deleted_at: null, is_deleted: false },
    });
    return NextResponse.json(restoredUser, { status: 200 });
  } catch (error) {
    console.error("Error restoring user:", error);
    return NextResponse.json(
      { error: "Failed to restore user" },
      { status: 500 }
    );
  }
}
