import { Module } from '@nestjs/common';

import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    PrismaModule,
    CloudinaryModule,
  ],

  controllers: [
    MenuController,
  ],

  providers: [
    MenuService,
  ],
})
export class MenuModule {}