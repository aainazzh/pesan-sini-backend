import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

import { Type }
from 'class-transformer';

export class CreateMenuDto {

  @IsString()
  name!: string;

  @Type(() => Number)

  @IsInt()
  price!: number;

  @IsOptional()
  @IsString()
  image?: string;

  @Type(() => Number)

  @IsInt()
  categoryId!: number;

}