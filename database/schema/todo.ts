import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const todo = pgTable(
  "todo",
  {
    id: serial("id").primaryKey(),
    description: text("description").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    completed: boolean("completed").default(false).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (todo) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(todo.id),
    };
  }
);
