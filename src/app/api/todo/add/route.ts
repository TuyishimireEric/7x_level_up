import { NextRequest, NextResponse } from "next/server";
import * as schema from "@/lib/schema";
import Joi from "joi";
import { sendResponse } from "@/src/utils/response";
import { db } from "@/lib/db";

const { todo } = schema;

const todoSchema = Joi.object({
  description: Joi.string().required().min(3)
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const { error } = todoSchema.validate(formData);

    if (error) {
      return sendResponse(400, null, "Error in creating todo! " + error.details[0].message);
    }

    const todos = await db.insert(todo).values(formData).returning();
    return sendResponse(201, todos, "Todo added successfully!");
  } catch (error) {
    return sendResponse(500, null, "Error in creating todo! " + error.message);
  }
}
