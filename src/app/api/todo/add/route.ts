import { NextRequest, NextResponse } from 'next/server';
import * as schema from '@/src/database/schema/schema';
import Joi from 'joi';
import { sendResponse } from '@/src/utils/response';
import { db } from '@/src/database/db';
import { auth } from '@/src/auth';
import { revalidatePath } from 'next/cache';

const { todo } = schema;

const todoSchema = Joi.object({
  description: Joi.string().required().min(3),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    const formData = await req.json();

    const { error } = todoSchema.validate(formData);

    if (error) {
      return sendResponse(
        400,
        null,
        'Error in creating todo! ' + error.details[0].message
      );
    }

    const todos = await db
      .insert(todo)
      .values({ ...formData, userId: session?.user.id })
      .returning();

    revalidatePath('/');
    return sendResponse(201, todos, 'Todo added successfully!');
  } catch (error: unknown) {
    const err = error as Error;
    return sendResponse(500, null, 'Error in deleting todo! ' + err.message);
  }
}
