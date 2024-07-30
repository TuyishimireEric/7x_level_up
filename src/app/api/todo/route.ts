import { db } from '@/src/database/db';
import * as schema from '@/src/database/schema/schema';
import { auth } from '@/src/auth';
import { sendResponse } from '@/src/utils/response';
import { eq } from 'drizzle-orm';

const { todo } = schema;

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return sendResponse(401, null, 'Unauthorized!');
    }

    const todos = await db
      .select()
      .from(todo)
      .where(eq(todo.userId, session.user.id));

    return sendResponse(200, todos, 'Todos retrieved successfully!');
  } catch (error: unknown) {
    const err = error as Error;
    return sendResponse(500, null, 'Error in deleting todo! ' + err.message);
  }
}
