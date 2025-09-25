import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { projects } from "@prisma/client";

// TODO: PAGINATION WITH LIMIT AND OFFSET
export async function GET() {
  try {
    // Get all projects with task counts grouped by status
    const projectsWithTaskCounts = await prisma.projects.findMany({
      include: {
        tasks: {
          select: {
            status: true,
          },
        },
      },
    });

    // Map through projects and count tasks by status
    const result = projectsWithTaskCounts.map((project) => {
      // Count tasks by status
      const counts = {
        notStarted: 0,
        inProgress: 0,
        completed: 0,
      };

      project.tasks.forEach((task) => {
        switch (task.status) {
          case "PENDING":
            counts.notStarted++;
            break;
          case "ACTIVE":
            counts.inProgress++;
            break;
          case "COMPLETED":
            counts.completed++;
            break;
        }
      });

      return {
        ...project,
        taskCounts: counts,
        tasks: undefined, // remove tasks array to keep response clean
      };
    });

    return NextResponse.json(result, { status: 200 });
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
