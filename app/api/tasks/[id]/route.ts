import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { tasks } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const task_id = parseInt(req.url.slice(req.url.lastIndexOf("/") + 1));

    const { title, description, assigned_to, deadline_at }: Partial<tasks> =
      await req.json();

    if (!task_id || !title || !description || !assigned_to || !deadline_at) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedTask = await prisma.tasks.update({
      where: { task_id },
      data: { title, description, assigned_to, deadline_at },
    });
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const task_id = parseInt(req.url.slice(req.url.lastIndexOf("/") + 1));
    if (!task_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const updatedTask = await prisma.tasks.update({
      where: { task_id },
      data: { is_completed: true },
    });
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const task_id = parseInt(req.url.slice(req.url.lastIndexOf("/") + 1));

    if (!task_id) {
      return NextResponse.json(
        { error: "task_id is required" },
        { status: 400 }
      );
    }
    await prisma.tasks.delete({
      where: { task_id },
    });
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
