import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { projects } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const project_id = parseInt(req.url.slice(req.url.lastIndexOf("/") + 1));

    const { name, description }: Partial<projects> = await req.json();

    if (!project_id || !name || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const updatedProject = await prisma.projects.update({
      where: { project_id },
      data: { name, description },
    });
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const project_id = parseInt(req.url.slice(req.url.lastIndexOf("/") + 1));

    if (!project_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.projects.delete({
      where: { project_id },
    });
    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
