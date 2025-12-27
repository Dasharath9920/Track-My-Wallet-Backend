import { Inject } from "@nestjs/common";
import { Kysely, sql } from "kysely";
import { KYSELY } from "src/database/database.module";
import { DB } from "src/database/types";

export class DashboardRepository {
  constructor(
    @Inject(KYSELY) private readonly client: Kysely<DB>
  ) { }

  getDashboardStatistics = async (userId: string) => {
    const result = await sql<{
      total_monthly_spends: string | null;
      top_category: string | null;
      top_amount: string | null;
    }>`
    WITH monthly AS (
      SELECT category, SUM(amount) AS total
      FROM transaction
      WHERE user_id = ${userId}
      AND date_trunc('month', date_of_transaction) = date_trunc('month', CURRENT_DATE)
      GROUP BY category
    )
    SELECT
      (SELECT SUM(total) FROM monthly) AS total_monthly_spends,
      category AS top_category,
      total AS top_amount
    FROM monthly
    ORDER BY total DESC
    LIMIT 1;
  `.execute(this.client);

    const row = result.rows[0];

    return {
      totalMonthlySpends: Number(row?.total_monthly_spends ?? 0),
      topCategory: row?.top_category ?? null,
      topAmount: Number(row?.top_amount ?? 0),
    };
  };

}