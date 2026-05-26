import { PartialType } from '@nestjs/swagger';
import { CreateBcryptDto } from './create-bcrypt.dto';

export class UpdateBcryptDto extends PartialType(CreateBcryptDto) {}
