CREATE TABLE IF NOT EXISTS "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "todo" USING btree ("id");