import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { DB } from './types';
import { Pool } from 'pg';

export const KYSELY = 'KYSELY';

@Module({
  providers: [
    {
      provide: KYSELY,
      useFactory: async () => {
        return new Kysely<DB>({
          dialect: new PostgresDialect({
            pool: new Pool({
              connectionString: process.env.DATABASE_URL,
              ssl: { rejectUnauthorized: false }
            })
          })
        })
      }
    }
  ],
  exports: [KYSELY]
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(@Inject(KYSELY) private readonly db: Kysely<DB>) { }

  async onModuleDestroy() {
    await this.db.destroy();
  }
}
