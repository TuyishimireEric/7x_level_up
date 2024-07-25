import * as schema from "@/lib/schema";
import Joi from "joi";
import { sendResponse } from "@/src/utils/response";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

const { todo } = schema;

export async function PUT(req) {
  try {
    const { description, completed } = await req.json();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return sendResponse(500, null, "No Id provided");
    }

    const result = await db
      .update(todo)
      .set({ description, completed })
      .where(eq(todo.id, Number(id)))
      .returning();

    if (result.length === 0) {
      return sendResponse(404, null, "Todo not found");
    }

    return sendResponse(200, result, "Todo Updated successfully!");
  } catch (error) {
    return sendResponse(500, null, "Error in updating todo! " + error.message);
  }
}
