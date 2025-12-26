import { Generated } from "kysely"

export interface UserTable {
  user_id: Generated<string>
  firstName: string
  lastName: string
  email: string
  password: string
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface TransactionTable {
  id: Generated<string>
  user_id: string
  category: string
  custom_category: string
  amount: number
  date_of_transaction: Generated<Date>
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface PaymentTable {
  id: Generated<string>
  user_id: string
  name: string
  total_months: number
  months_remaining: number
  amount: number
  due_date: Generated<Date>
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface DB {
  user: UserTable,
  transaction: TransactionTable,
  payment: PaymentTable
}