import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './transactions.repository';
import { CreateTransactionRequest } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {

  constructor(
    private readonly transactionRepository: TransactionRepository
  ) { }

  async create(createTransactionDto: CreateTransactionRequest) {
    const res = await this.transactionRepository.createTransaction(createTransactionDto);
    const transactions = await this.transactionRepository.getAllTransactions(createTransactionDto.user_id);
    return {
      data: transactions
    };
  }

  async findAll(userId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const transactions = await this.transactionRepository.getAllTransactions(userId);
    return {
      data: transactions,
    };
  }

  async getLastNDaysTransactions(userId: string, days: number) {
    const transactions = await this.transactionRepository.getNDaysTransactions(userId, days);
    return {
      data: transactions
    }
  }

  async getNDaysTransactionsGroupByDays(userId: string, days: number) {
    const transactions = await this.transactionRepository.getNDaysTransactionsGroupByDate(userId, days);
    return {
      data: transactions
    }
  }

  async update(userId: string, updateTransactionDto: UpdateTransactionDto) {
    await this.transactionRepository.updateTransaction(userId, updateTransactionDto);
    const transactions = await this.transactionRepository.getAllTransactions(updateTransactionDto.user_id);
    return {
      data: transactions
    };
  }

  async remove(id: string, userId: string) {
    await this.transactionRepository.deleteTransaction(id, userId);
    const data = await this.transactionRepository.getAllTransactions(userId);
    return {
      data
    };
  }
}
