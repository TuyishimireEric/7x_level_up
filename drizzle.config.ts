// import "@/lib/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL! + "?sslmode=require",
  },
  verbose: true,
  strict: true,
});
