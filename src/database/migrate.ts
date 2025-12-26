import { Kysely, Migrator, FileMigrationProvider, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import * as fs from 'fs/promises';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();

function createDb() {
  return new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }),
    }),
  });
}

async function createMigrator(db: Kysely<any>) {
  return new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.resolve(__dirname, './migrations'),
    }),
  });
}

async function run() {
  const command = process.argv[2] || 'up';
  const db = createDb();
  const migrator = await createMigrator(db);

  if (command === 'up') {
    console.log('🚀 Running migrations...');
    const { error, results } = await migrator.migrateToLatest();
    results?.forEach(r => console.log(`${r.status} — ${r.migrationName}`));
    if (error) {
      console.log(error);
      process.exit(1)
    };
    console.log('Migrations complete');
  }

  if (command === 'down') {
    console.log('⏪ Rolling back latest migration...');
    const { error, results } = await migrator.migrateDown();
    results?.forEach(r => console.log(`${r.status} — ${r.migrationName}`));
    if (error) {
      console.log(error);
      process.exit(1)
    };
  }

  if (command === 'status') {
    const migrations = await migrator.getMigrations();
    console.log('📌 Migration Status');
    migrations.forEach(m =>
      console.log(`${m.name} — ${m.executedAt ? 'DONE' : 'PENDING'}`)
    );
  }

  await db.destroy();
}

run();
