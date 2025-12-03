import { fullHealthCheck } from "@/lib/db-utils";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("🔍 Health API: Starting comprehensive health check...");
    
    // Run full health check
    const healthCheck = await fullHealthCheck();
    
    // Also get users if connection is successful
    let users = [];
    if (healthCheck.connection.connected) {
      try {
        users = await prisma.user.findMany();
        console.log(`✅ Retrieved ${users.length} users`);
      } catch (queryError) {
        console.warn("⚠️ Could not query users:", queryError.message);
      }
    }

    const response = {
      status: healthCheck.overall === "healthy" ? "ok" : "warning",
      health: healthCheck,
      users,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), {
      status: healthCheck.overall === "healthy" ? 200 : 503,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Health API error:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack,
    });

    return new Response(
      JSON.stringify({
        status: "error",
        error: error.message,
        code: error.code,
        details: error.meta,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
