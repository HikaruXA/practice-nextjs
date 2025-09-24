import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { projects } from "@prisma/client";

// TODO: Add authentication and authorization to restrict access to authenticated users only
export async function GET() {
  try {
    const projects = await prisma.projects.findMany();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// TODO: Add authentication and authorization to restrict access to Project Managers only
export async function POST(req: Request) {
  try {
    const { name, description, created_by }: Partial<projects> =
      await req.json();

    if (!name || !description || !created_by) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProject = await prisma.projects.create({
      data: {
        name,
        description,
        created_by,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
