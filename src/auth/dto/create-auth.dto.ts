import { Role } from '@prisma/client';

export class CreateAuthDto {

  username!: string;

  password!: string;

  role!: Role;

}