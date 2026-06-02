import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import { Type }
from 'class-transformer';

import { PaymentMethod }
from '@prisma/client';

class OrderItemDto {

  @IsInt()
  menuId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;

}

export class CreateOrderDto {

  @IsInt()
  tableNumber!: number;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsArray()
  @ValidateNested({ each: true })

  @Type(() => OrderItemDto)
  items!: OrderItemDto[];
  
  @IsString()
  notes!: string;
}