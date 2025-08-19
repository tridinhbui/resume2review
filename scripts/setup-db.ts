import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../src/db/schema';

// This script helps set up the database for development
// Run with: npx tsx scripts/setup-db.ts

async function setupDatabase() {
  const connectionString = process.env.POSTGRES_URL;
  
  if (!connectionString) {
    console.error('❌ POSTGRES_URL environment variable is not set');
    console.log('Please create a .env.local file with your database connection string');
    process.exit(1);
  }

  try {
    console.log('🔌 Connecting to database...');
    const client = postgres(connectionString);
    const db = drizzle(client, { schema });

    // Test the connection
    await db.select().from(schema.mentees).limit(1);
    console.log('✅ Database connection successful!');
    
    console.log('📊 Database schema is ready');
    console.log('🚀 You can now run: npm run dev');
    
    await client.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    console.log('💡 Make sure your database is running and the connection string is correct');
    process.exit(1);
  }
}

setupDatabase();

