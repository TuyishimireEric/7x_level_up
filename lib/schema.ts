import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const todo = pgTable(
  "todo",
  {
    id: serial("id").primaryKey(),
    description: text("description").notNull(),
    completed: boolean("completed").default(false).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (todo) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(todo.id),
    };
  }
);
