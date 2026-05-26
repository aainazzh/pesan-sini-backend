import { Injectable } from '@nestjs/common';

import { PrismaService }
from 'src/prisma/prisma.service';

import { CreateCategoryDto }
from './dto/create-category.dto';

import { UpdateCategoryDto }
from './dto/update-category.dto';

@Injectable()
export class CategoryService {

  constructor(
    private prisma: PrismaService,
  ) {}

  create(body: CreateCategoryDto) {

    return this.prisma.category.create({
      data: body,
    });

  }

  findAll() {

    return this.prisma.category.findMany({
      include: {
        menus: true,
      },
    });

  }

  findOne(id: number) {

    return this.prisma.category.findUnique({
      where: { id },

      include: {
        menus: true,
      },
    });

  }

  update(
    id: number,
    body: UpdateCategoryDto,
  ) {

    return this.prisma.category.update({
      where: { id },

      data: body,
    });

  }

  remove(id: number) {

    return this.prisma.category.delete({
      where: { id },
    });

  }

}