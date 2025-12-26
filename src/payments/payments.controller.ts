import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentRequest } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post()
  create(@Body() createPaymentDto: CreatePaymentRequest) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.paymentsService.findAll(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
