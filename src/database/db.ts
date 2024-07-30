import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from '@/src/database/schema/schema';

export const db = drizzle(sql, { schema });
