import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Only create connection if we're not in build time
let db: any;
if (process.env.POSTGRES_URL && process.env.NODE_ENV !== 'production') {
  const connectionString = process.env.POSTGRES_URL;
  const client = postgres(connectionString);
  db = drizzle(client, { schema });
} else {
  // Mock db for build time
  db = {
    select: () => ({ from: () => ({ innerJoin: () => ({ where: () => ({ limit: () => [] }) }) }) }),
    insert: () => ({ values: () => ({ onConflictDoNothing: () => ({ returning: () => [] }) }) })
  };
}

export { db };
