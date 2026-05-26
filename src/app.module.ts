import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PublicModule } from './public/public.module';
import { TableModule } from './table/table.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [
    PrismaModule,
    AuthModule,
    BcryptModule,
    UserModule,
    CategoryModule,
    MenuModule,
    TableModule,
    OrderModule,
    PublicModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})

export class AppModule {}