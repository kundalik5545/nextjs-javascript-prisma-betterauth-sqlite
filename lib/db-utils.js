import prisma from "@/lib/prisma";

/**
 * Verify database connection and migrations status
 * @returns {Promise<{connected: boolean, error?: string, migrationStatus?: string}>}
 */
export async function verifyDatabaseConnection() {
  try {
    console.log("🔍 Verifying database connection...");
    
    // Test connection
    await prisma.$connect();
    console.log("✅ Database connection successful");
    
    // Test a simple query
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database query test successful");
    
    // Check if tables exist by trying to count from User table
    try {
      const userCount = await prisma.user.count();
      console.log(`✅ User table accessible. Count: ${userCount}`);
      
      return {
        connected: true,
        userCount,
        message: "Database connection verified",
      };
    } catch (tableError) {
      console.warn("⚠️ User table may not exist:", tableError.message);
      return {
        connected: true,
        warning: "Tables may not be migrated. Run: pnpm dlx prisma migrate dev",
        error: tableError.message,
      };
    }
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return {
      connected: false,
      error: error.message,
      code: error.code,
      details: error.meta,
    };
  }
}

/**
 * Check migration status
 * @returns {Promise<{status: string, foundTables?: string[], missingTables?: string[]}>}
 */
export async function checkMigrationStatus() {
  try {
    // Try to get migration status using Prisma
    // PostgreSQL-specific query to get all tables
    const result = await prisma.$queryRaw`
      SELECT tablename as name FROM pg_tables 
      WHERE schemaname = 'public' AND tablename NOT LIKE '_prisma_%'
      ORDER BY tablename
    `;
    
    // Handle both array of objects and array of strings
    const tables = Array.isArray(result) 
      ? result.map((row) => (typeof row === 'string' ? row : row.name))
      : [];
    console.log("📊 Found tables:", tables);
    
    const expectedTables = ["user", "session", "account", "verification", "Todo"];
    const missingTables = expectedTables.filter(
      (table) => !tables.includes(table)
    );
    
    if (missingTables.length > 0) {
      console.warn("⚠️ Missing tables:", missingTables);
      return {
        status: "incomplete",
        foundTables: tables,
        missingTables,
        message: "Some tables are missing. Run: pnpm dlx prisma migrate dev",
      };
    }
    
    console.log("✅ All expected tables exist");
    return {
      status: "complete",
      foundTables: tables,
      message: "All expected tables exist",
    };
  } catch (error) {
    console.error("❌ Migration check failed:", error);
    return {
      status: "error",
      error: error.message,
      code: error.code,
    };
  }
}

/**
 * Full database health check
 * @returns {Promise<{connection: any, migrations: any, overall: string}>}
 */
export async function fullHealthCheck() {
  console.log("🏥 Starting full database health check...");
  
  const connection = await verifyDatabaseConnection();
  const migrations = await checkMigrationStatus();
  
  const overall =
    connection.connected && migrations.status === "complete"
      ? "healthy"
      : "unhealthy";
  
  return {
    connection,
    migrations,
    overall,
    timestamp: new Date().toISOString(),
  };
}

