import {
  Body,
  Controller,
  Delete,
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

import { OrderService }
from './order.service';

import { CreateOrderDto }
from './dto/create-order.dto';

import { CloudinaryService }
from 'src/cloudinary/cloudinary.service';

@Controller('order')
export class OrderController {

  constructor(
    private readonly orderService: OrderService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(
    @Body() body: CreateOrderDto,
  ) {

    return this.orderService.create(
      body,
    );

  }

  @Get()
  findAll() {

    return this.orderService.findAll();

  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {

    return this.orderService.findOne(
      +id,
    );

  }

  @Post(':id/upload-proof')

  @UseInterceptors(
    FileInterceptor('file'),
  )

  async uploadProof(

    @Param('id')
    id: string,

    @UploadedFile()
    file: Express.Multer.File,

  ) {

    const uploaded: any =
      await this.cloudinaryService.uploadImage(
        file,
      );

    return this.orderService.uploadProof(
      +id,
      uploaded.secure_url,
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

  @Delete(':id/cancel')
  cancelOrder(
    @Param('id') id: string,
  ) {

    return this.orderService.cancelOrder(
      +id,
    );

  }

}