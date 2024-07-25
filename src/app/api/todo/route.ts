import { db } from "@/database/db";
import * as schema from "@/database/schema/schema";
import { auth } from "@/src/auth";
import { sendResponse } from "@/src/utils/response";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

const { todo } = schema;

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      redirect("/api/auth/signin");
    }

    const todos = await db
      .select()
      .from(todo)
      .where(eq(todo.userId, session.user.id));
    return sendResponse(200, todos, "Todos retrieved successfully!");
  } catch (error) {
    return sendResponse(500, null, "Error in getting todos!" + error.message);
  }
}
