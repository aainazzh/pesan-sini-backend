import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService }
from 'src/prisma/prisma.service';

import { CreateMenuDto }
from './dto/create-menu.dto';

import { UpdateMenuDto }
from './dto/update-menu.dto';

import * as fs from 'fs';
import * as path from 'path';

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

  async update(
    id: number,
    body: UpdateMenuDto,
  ) {

    const menu =
      await this.prisma.menu.findUnique({

        where: { id },

      });

    if (!menu) {

      throw new BadRequestException(
        'Menu tidak ditemukan.',
      );

    }

    if (

      body.image &&

      menu.image

    ) {

      const imagePath =

        path.join(

          process.cwd(),

          menu.image,

        );

      if (

        fs.existsSync(
          imagePath,
        )

      ) {

        fs.unlinkSync(
          imagePath,
        );

      }

    }

    return this.prisma.menu.update({

      where: { id },

      data: body,

    });

  }

  async remove(id: number) {

    try {

      const menu =
        await this.prisma.menu.findUnique({

          where: { id },

        });

      if (!menu) {

        throw new BadRequestException(
          'Menu tidak ditemukan di database.',
        );

      }

      await this.prisma.orderItem.deleteMany({

        where: {

          menuId: id,

        },

      });

      const deletedMenu =
        await this.prisma.menu.delete({

          where: { id },

        });

      if (menu.image) {

        const imagePath =

          path.join(
            process.cwd(),
            menu.image,
          );

        if (

          fs.existsSync(
            imagePath,
          )

        ) {

          fs.unlinkSync(
            imagePath,
          );

        }

      }

      return deletedMenu;

    } catch (error: any) {

      console.error(error);

      throw new InternalServerErrorException(
        'Terjadi kesalahan sistem saat menghapus menu.',
      );

    }

  }

}