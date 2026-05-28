import { Role } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateAuthDto {

  @IsString()
  username!: string;

  @IsString()
  password!: string;

  @IsEnum(Role)
  role!: Role;

}