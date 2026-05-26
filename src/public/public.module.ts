import { Module }
from '@nestjs/common';

import { PublicController }
from './public.controller';

import { PrismaModule }
from 'src/prisma/prisma.module';

import { OrderModule }
from 'src/order/order.module';

@Module({

  imports: [
    PrismaModule,
    OrderModule,
  ],

  controllers: [
    PublicController,
  ],

})

export class PublicModule {}