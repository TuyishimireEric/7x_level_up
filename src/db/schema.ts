import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  description: text("description").notNull(),
  done: boolean("done").default(false).notNull(),
});
