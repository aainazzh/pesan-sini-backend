import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateBcryptDto } from './dto/create-bcrypt.dto';
import { UpdateBcryptDto } from './dto/update-bcrypt.dto';

@Injectable()
export class BcryptService {
  create(createBcryptDto: CreateBcryptDto) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  update(arg0: number, updateBcryptDto: UpdateBcryptDto) {
    throw new Error('Method not implemented.');
  }
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }

  async hashPassword(password: string): Promise<string> {

    return bcrypt.hash(password, 10);

  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {

    return bcrypt.compare(password, hashedPassword);

  }

}