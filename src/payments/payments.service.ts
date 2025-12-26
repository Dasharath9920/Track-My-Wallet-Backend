import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentRequest } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentRepository } from './payments.repository';

@Injectable()
export class PaymentsService {

  constructor(private readonly paymentRepository: PaymentRepository) { }

  async create(payment: CreatePaymentRequest) {
    await this.paymentRepository.createPayment(payment);
    const payments = await this.paymentRepository.getAllPayments(payment.user_id);
    return {
      data: payments
    };
  }

  async findAll(userId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    const payments = await this.paymentRepository.getAllPayments(userId);
    return {
      data: payments
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
