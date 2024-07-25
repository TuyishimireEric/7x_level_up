import { NextRequest, NextResponse } from "next/server";
import * as schema from "@/lib/schema";
import Joi from "joi";
import { sendResponse } from "@/src/utils/response";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

const { todo } = schema;


export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return sendResponse(500, null, "No Id provided");
    }

    const result = await db
      .delete(todo)
      .where(eq(todo.id, Number(id)))
      .returning();

    if (result.length === 0) {
      return sendResponse(404, null, "Todo not found");
    }

    return sendResponse(200, result, "Todo deleted successfully!");
  } catch (error) {
    return sendResponse(500, null, "Error in deleting todo! " + error.message);
  }
}
