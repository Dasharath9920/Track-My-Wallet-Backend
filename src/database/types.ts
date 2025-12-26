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
  customCategory: string
  amount: number
  dateOfTransaction: Generated<Date>
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface PaymentTable {
  id: Generated<string>
  user_id: string
  name: string
  totalMonths: number
  monthsRemaining: number
  amount: number
  dueDate: Generated<Date>
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface DB {
  user: UserTable,
  transaction: TransactionTable,
  payment: PaymentTable
}