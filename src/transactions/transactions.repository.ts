import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "src/database/database.module";
import { DB } from "src/database/types";
import { CreateTransactionRequest } from "./dto/create-transaction.dto";

@Injectable()
export class TransactionRepository {
  constructor(
    @Inject(KYSELY) private readonly client: Kysely<DB>,
  ) { }

  createTransaction = async (transaction: CreateTransactionRequest) => {
    const { user_id, category, customCategory, amount, date_of_transaction } = transaction;
    const record = await this.client
      .insertInto('transaction')
      .values({
        user_id: user_id,
        category,
        custom_category: customCategory ?? '',
        amount,
        date_of_transaction,
      })
      .returningAll()
      .execute();

    return record;
  }

  getAllTransactions = async (userId: string) => {
    const records = await this.client
      .selectFrom('transaction')
      .selectAll()
      .where('user_id', '=', userId)
      .orderBy('date_of_transaction', 'desc')
      .execute();
    return records;
  }

  getNDaysTransactions = async (userId: string, days: number) => {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const records = await this.client
      .selectFrom('transaction')
      .selectAll()
      .where('user_id', '=', userId)
      .where('date_of_transaction', '>=', since)
      .orderBy('date_of_transaction', 'desc')
      .execute();
    return records;
  }
}