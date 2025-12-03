import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// Use the shared Prisma instance to avoid multiple connections
import prisma from "@/lib/prisma";

// Debug logging
if (process.env.NODE_ENV === "development") {
  console.log("🔐 Initializing Better Auth with Prisma adapter");
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
