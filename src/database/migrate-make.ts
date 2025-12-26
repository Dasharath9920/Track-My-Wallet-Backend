import path from "path";
import { promises as fs } from 'fs';

async function main() {
  const nameArg = process.argv[2];

  if (!nameArg) {
    console.error('Please provide a migration name');
    console.error('Example: npm run migrate:make create_users_table');
    process.exit(1);
  }

  const timestamp = new Date()
    .toISOString().replace(/[-:.fTZ]/g, '').slice(0, 14);
  const fileName = `${timestamp}_${nameArg}.ts`;

  const migrationsDir = path.join(__dirname, 'migrations');
  const filePath = path.join(migrationsDir, fileName);

  await fs.mkdir(migrationsDir, { recursive: true });

  const template = `
    import { Kysely } from 'kysely';

    export async function up(db: Kysely<any>) {
      // TODO: Write migration here
    }

    export async function down(db: Kysely<any>) {
      // TODO: rollback migration here
    }
  `.trim();

  await fs.writeFile(filePath, template);

  console.log('Migration created: ');
  console.log(filePath);
}

main();