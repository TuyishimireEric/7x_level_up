import * as schema from "@/database/schema/schema";
import Joi from "joi";
import { sendResponse } from "@/src/utils/response";
import { and, eq } from "drizzle-orm";
import { db } from "@/database/db";
import { auth } from "@/src/auth";
import { redirect } from "next/navigation";

const { todo } = schema;

export async function PUT(req) {
  try {
    const session = await auth();

    if (!session?.user) {
      redirect("/api/auth/signin");
    }

    const { description, completed } = await req.json();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return sendResponse(500, null, "No Id provided");
    }

    const result = await db
      .update(todo)
      .set({ description, completed })
      .where(and(eq(todo.id, Number(id)), eq(todo.userId, session.user.id)))
      .returning();

    if (result.length === 0) {
      return sendResponse(404, null, "Todo not found");
    }

    return sendResponse(200, result, "Todo Updated successfully!");
  } catch (error) {
    return sendResponse(500, null, "Error in updating todo! " + error.message);
  }
}
