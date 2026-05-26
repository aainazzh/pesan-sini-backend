import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import {
  FileInterceptor,
} from '@nestjs/platform-express';

import { diskStorage }
from 'multer';

import { extname }
from 'path';

import { PrismaService }
from 'src/prisma/prisma.service';

import { OrderService }
from 'src/order/order.service';

import { CreateOrderDto }
from 'src/order/dto/create-order.dto';

@Controller('public')
export class PublicController {

  constructor(

    private prisma: PrismaService,

    private orderService: OrderService,

  ) {}

  @Get('menu')
  getMenu() {

    return this.prisma.menu.findMany({

      include: {
        category: true,
      },

    });

  }

  @Post('order')
  createOrder(
    @Body() body: CreateOrderDto,
  ) {

    return this.orderService.create(body);

  }

  @Post('order/:id/upload-proof')

  @UseInterceptors(

    FileInterceptor(

      'file',

      {

        storage: diskStorage({

          destination:
            './uploads',

          filename: (
            req,
            file,
            callback,
          ) => {

            const uniqueName =

              Date.now() +

              extname(
                file.originalname,
              );

            callback(
              null,
              uniqueName,
            );

          },

        }),

      },

    ),

  )

  uploadProof(

    @Param('id') id: string,

    @UploadedFile()
    file: Express.Multer.File,

  ) {

    return this.orderService.uploadProof(

      +id,

      file.filename,

    );

  }

}