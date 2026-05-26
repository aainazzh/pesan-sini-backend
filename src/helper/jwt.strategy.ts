import { Injectable }
from '@nestjs/common';

import { PassportStrategy }
from '@nestjs/passport';

import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

type Payload = {
  sub: number;
  username: string;
  role: string;
};

@Injectable()
export class JWTStrategy
extends PassportStrategy(Strategy) {

  constructor() {

    super({

      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey:
        process.env.JWT_SECRET ||
        'secretKey',

    });

  }

  async validate(
    payload: Payload,
  ) {

    return payload;

  }

}