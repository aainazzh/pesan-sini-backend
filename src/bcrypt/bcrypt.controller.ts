import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { CreateBcryptDto } from './dto/create-bcrypt.dto';
import { UpdateBcryptDto } from './dto/update-bcrypt.dto';

@Controller('bcrypt')
export class BcryptController {
  constructor(private readonly bcryptService: BcryptService) {}

  @Post()
  create(@Body() createBcryptDto: CreateBcryptDto) {
    return this.bcryptService.create(createBcryptDto);
  }

  @Get()
  findAll() {
    return this.bcryptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bcryptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBcryptDto: UpdateBcryptDto) {
    return this.bcryptService.update(+id, updateBcryptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bcryptService.remove(+id);
  }
}
