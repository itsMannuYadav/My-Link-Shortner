import "dotenv/config";

import { createClient } from "@libsql/client";

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    throw new Error(
      "Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment.",
    );
  }

  const client = createClient({ url, authToken });

  await client.batch([
    `CREATE TABLE IF NOT EXISTS "Link" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "shortCode" TEXT NOT NULL,
      "originalUrl" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "Link_shortCode_key" ON "Link"("shortCode")`,
    `CREATE INDEX IF NOT EXISTS "Link_createdAt_idx" ON "Link"("createdAt")`,
  ]);

  console.log("Turso schema is ready.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
