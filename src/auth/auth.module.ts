import { Module }
from '@nestjs/common';

import { JwtModule }
from '@nestjs/jwt';

import { PassportModule }
from '@nestjs/passport';

import { AuthController }
from './auth.controller';

import { AuthService }
from './auth.service';

import { JWTStrategy }
from 'src/helper/jwt.strategy';

import { PrismaModule }
from 'src/prisma/prisma.module';

import { BcryptModule }
from 'src/bcrypt/bcrypt.module';

@Module({

  imports: [

    PrismaModule,

    BcryptModule,

    PassportModule.register({

      defaultStrategy: 'jwt',

    }),

    JwtModule.register({

      secret:
        process.env.JWT_SECRET,

      signOptions: {

        expiresIn:

          (process.env.JWT_EXPIRATION ||

          '1d') as any,

      },

    }),

  ],

  controllers: [
    AuthController,
  ],

  providers: [

    AuthService,

    JWTStrategy,

  ],

})

export class AuthModule {}