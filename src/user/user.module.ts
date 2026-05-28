import { Module }from '@nestjs/common';
import { UserController }from './user.controller';
import { UserService }from './user.service';
import { PrismaModule }from 'src/prisma/prisma.module';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Module({

  imports: [
    PrismaModule,
  ],

  controllers: [
    UserController,
  ],

  providers: [
    UserService,
    BcryptService,
  ],

  exports: [
    UserService,
  ],

})

export class UserModule {}