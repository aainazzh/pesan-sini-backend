import {
  Injectable,
} from '@nestjs/common';

import { PrismaService }
from 'src/prisma/prisma.service';

@Injectable()
export class TableService {

  constructor(
    private prisma: PrismaService,
  ) {}

  create(body: any) {

    return this.prisma.table.create({

      data: body,

    });

  }

  findAll() {

    return this.prisma.table.findMany();

  }

  findOne(id: number) {

    return this.prisma.table.findUnique({

      where: { id },

    });

  }

  update(
    id: number,
    body: any,
  ) {

    return this.prisma.table.update({

      where: { id },

      data: body,

    });

  }

  remove(id: number) {

    return this.prisma.table.delete({

      where: { id },

    });

  }

}