import { NextResponse } from "next/server";
import { users } from "@prisma/client";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// TODO: Add authentication and authorization to restrict access to admin users only
export async function POST(req: Request) {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      role,
      profile_url,
    }: Partial<users> = await req.json();

    if (!email || !password || !first_name || !last_name || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        role,
        profile_url,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
