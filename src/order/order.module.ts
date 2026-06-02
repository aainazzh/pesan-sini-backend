import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    PrismaModule,
    CloudinaryModule,
  ],

  controllers: [
    OrderController,
  ],

  providers: [
    OrderService,
  ],

  exports: [
    OrderService,
  ],
})
export class OrderModule {}