import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { tasks } from "@prisma/client";

// TODO: Add authentication and authorization to restrict access to authenticated users only

export async function GET() {
  try {
    const tasks = await prisma.tasks.findMany();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// TODO: Add authentication and authorization to restrict access to Project Managers only
export async function POST(req: Request) {
  try {
    const {
      project_id,
      title,
      description,
      assigned_to,
      created_by,
      deadline_at,
    }: Partial<tasks> = await req.json();

    if (
      !project_id ||
      !title ||
      !description ||
      !assigned_to ||
      !created_by ||
      !deadline_at
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTask = await prisma.tasks.create({
      data: {
        project_id,
        title,
        description,
        assigned_to,
        created_by,
        deadline_at,
      },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
