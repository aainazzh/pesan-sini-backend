import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard }
from 'src/guards/jwt-auth.guard';

import { CategoryService }
from './category.service';

import { CreateCategoryDto }
from './dto/create-category.dto';

import { UpdateCategoryDto }
from './dto/update-category.dto';

@UseGuards(
  JwtAuthGuard,
)

@Controller('category')
export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  create(
    @Body() body: CreateCategoryDto,
  ) {

    return this.categoryService.create(body);

  }

  @Get()
  findAll() {

    return this.categoryService.findAll();

  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {

    return this.categoryService.findOne(+id);

  }

  @Patch(':id')
  update(

    @Param('id') id: string,

    @Body() body: UpdateCategoryDto,

  ) {

    return this.categoryService.update(
      +id,
      body,
    );

  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {

    return this.categoryService.remove(+id);

  }

}