import { PrismaClient } from "./generated/prisma/client";

// Singleton pattern for Prisma Client in Next.js
const globalForPrisma = globalThis;

// Create Prisma Client with debugging enabled
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn", "info"]
        : ["error"],
  });

// Prevent multiple instances in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Log database URL in development (don't connect here, let it connect on first use)
if (process.env.NODE_ENV === "development") {
  console.log("📊 Prisma Client initialized");
  console.log("📊 Database URL:", process.env.DATABASE_URL || "⚠️ Not set - check your .env file");
}

// Graceful shutdown
if (typeof process !== "undefined") {
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
    console.log("🔌 Prisma Client disconnected");
  });
}

export default prisma;
