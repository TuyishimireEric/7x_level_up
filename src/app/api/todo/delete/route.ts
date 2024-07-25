import { NextRequest } from "next/server";
import * as schema from "@/database/schema/schema";
import { sendResponse } from "@/src/utils/response";
import { and, eq } from "drizzle-orm";
import { db } from "@/database/db";
import { redirect } from "next/navigation";
import { auth } from "@/src/auth";

const { todo } = schema;

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      redirect("/api/auth/signin");
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return sendResponse(500, null, "No Id provided");
    }

    const result = await db
      .delete(todo)
      .where(and(eq(todo.id, Number(id)), eq(todo.userId, session.user.id)))
      .returning();

    if (result.length === 0) {
      return sendResponse(404, null, "Todo not found");
    }

    return sendResponse(200, result, "Todo deleted successfully!");
  } catch (error) {
    return sendResponse(500, null, "Error in deleting todo! " + error.message);
  }
}
