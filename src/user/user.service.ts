import {
  Injectable,
} from '@nestjs/common';

import { PrismaService }
from 'src/prisma/prisma.service';

import { BcryptService }
from 'src/bcrypt/bcrypt.service';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
  ) {}

  async create(body: any) {

    const hashedPassword =
      await this.bcryptService.hashPassword(
        body.password,
      );

    return this.prisma.user.create({

      data: {
        username: body.username,
        password: hashedPassword,
        role: body.role,
      },

    });

  }

  findByUsername(
    username: string,
  ) {

    return this.prisma.user.findUnique({

      where: {
        username,
      },

    });

  }

}