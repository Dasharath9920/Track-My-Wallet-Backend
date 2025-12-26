import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentRequest } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentRequest) { }
