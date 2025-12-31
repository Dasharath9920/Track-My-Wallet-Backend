import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionRequest } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  create(@Body() createTransactionDto: CreateTransactionRequest) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get(':userId')
  getAllTransactions(
    @Param('userId') userId: string,
    @Query('days') days?: number,
  ) {
    if (days) {
      return this.transactionsService.getLastNDaysTransactions(userId, Number(days));
    }
    return this.transactionsService.findAll(userId);
  }

  @Get(':userId/group-by-day')
  getTransactionsGroupByDay(
    @Param('userId') userId: string,
    @Query('days') days?: number,
  ) {
    return this.transactionsService.getNDaysTransactionsGroupByDays(userId, Number(days));
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(userId, updateTransactionDto);
  }

  @Delete(':userId')
  remove(
    @Param('userId') userId: string,
    @Query('id') id: string) {
    return this.transactionsService.remove(id, userId);
  }
}
