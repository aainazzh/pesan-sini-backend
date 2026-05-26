import { Injectable } from '@nestjs/common';

import { PrismaService }
from 'src/prisma/prisma.service';

import { CreateMenuDto }
from './dto/create-menu.dto';

import { UpdateMenuDto }
from './dto/update-menu.dto';

@Injectable()
export class MenuService {

  constructor(
    private prisma: PrismaService,
  ) {}

  create(body: CreateMenuDto) {

    return this.prisma.menu.create({
      data: body,
    });

  }

  findAll() {

    return this.prisma.menu.findMany({
      include: {
        category: true,
      },
    });

  }

  findOne(id: number) {

    return this.prisma.menu.findUnique({
      where: { id },

      include: {
        category: true,
      },
    });

  }

  update(
    id: number,
    body: UpdateMenuDto,
  ) {

    return this.prisma.menu.update({
      where: { id },

      data: body,
    });

  }

  remove(id: number) {

    return this.prisma.menu.delete({
      where: { id },
    });

  }

}