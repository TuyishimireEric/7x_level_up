import { NextRequest } from "next/server";
import * as schema from "@/src/database/schema/schema";
import { sendResponse } from "@/src/utils/response";
import { and, eq } from "drizzle-orm";
import { db } from "@/src/database/db";
import { auth } from "@/src/auth";
import { revalidatePath } from "next/cache";

const { todo } = schema;

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return sendResponse(401, null, "Unauthorized!");
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return sendResponse(400, null, "No Id provided");
    }

    const result = await db
      .delete(todo)
      .where(and(eq(todo.id, Number(id)), eq(todo.userId, session.user.id)))
      .returning();

    if (result.length === 0) {
      return sendResponse(404, null, "Todo not found");
    }

    revalidatePath("/");
    return sendResponse(200, result, "Todo deleted successfully!");
  } catch (error: unknown) {
    const err = error as Error;
    return sendResponse(500, null, "Error in deleting todo! " + err.message);
  }
}
