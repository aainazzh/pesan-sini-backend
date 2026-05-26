import {
  Injectable,
} from '@nestjs/common';

import { PrismaService }
from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
  ) {}

  create(body: any) {

    return this.prisma.user.create({

      data: body,

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