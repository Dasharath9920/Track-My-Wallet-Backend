import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionRequest } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionRequest) { }
