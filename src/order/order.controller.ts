import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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

import { OrderService }
from './order.service';

import { CreateOrderDto }
from './dto/create-order.dto';

@Controller('order')
export class OrderController {

  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post()
  create(
    @Body() body: CreateOrderDto,
  ) {

    return this.orderService.create(body);

  }

  @Get()
  findAll() {

    return this.orderService.findAll();

  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {

    return this.orderService.findOne(+id);

  }

  @Post(':id/upload-proof')

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

  @Put(':id/verify')
  verifyPayment(
    @Param('id') id: string,
  ) {

    return this.orderService.verifyPayment(
      +id,
    );

  }

  @Put(':id/reject')
  rejectPayment(
    @Param('id') id: string,
  ) {

    return this.orderService.rejectPayment(
      +id,
    );

  }

}