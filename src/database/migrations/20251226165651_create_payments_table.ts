import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('payment')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('user_id', 'uuid', col => col.notNull())
    .addColumn('name', 'text', col => col.notNull())
    .addColumn('total_months', 'integer', col => col.notNull())
    .addColumn('months_remaining', 'integer', col => col.notNull())
    .addColumn('amount', 'numeric', col => col.notNull())
    .addColumn('due_date', 'date', col => col.notNull())
    .addColumn('created_at', 'timestamptz', col =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn('updated_at', 'timestamptz', col =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('payment').execute();
}
