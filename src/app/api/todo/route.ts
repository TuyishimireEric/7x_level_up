import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { sendResponse } from "@/src/utils/response";

const { todo } = schema;

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const todos = await db.select().from(todo);
    return sendResponse(200, todos, "Todos retrieved successfully!");
  } catch (error) {
    return sendResponse(500, null, "Error in getting todos!" + error.message);
  }
}
