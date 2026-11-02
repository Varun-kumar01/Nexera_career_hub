import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var postgresPool: Pool | undefined;
}

const pool =
  global.postgresPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  global.postgresPool = pool;
}

export default pool;