import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtAuthGuard }
from 'src/guards/jwt-auth.guard';

import {
  FileInterceptor,
} from '@nestjs/platform-express';

import { MenuService }
from './menu.service';

import { CreateMenuDto }
from './dto/create-menu.dto';

import { UpdateMenuDto }
from './dto/update-menu.dto';

import { CloudinaryService }
from 'src/cloudinary/cloudinary.service';

@UseGuards(
  JwtAuthGuard,
)

@Controller('menu')
export class MenuController {

  constructor(
    private readonly menuService: MenuService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()

  @UseInterceptors(
    FileInterceptor('image'),
  )

  async create(

    @UploadedFile()
    file: Express.Multer.File,

    @Body()
    body: CreateMenuDto,

  ) {

    if (file) {

      const uploaded: any =
        await this.cloudinaryService.uploadImage(
          file,
        );

      body.image =
        uploaded.secure_url;

    }

    return this.menuService.create(
      body,
    );

  }

  @Get()
  findAll() {

    return this.menuService.findAll();

  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {

    return this.menuService.findOne(
      +id,
    );

  }

  @Patch(':id')

  @UseInterceptors(
    FileInterceptor('image'),
  )

  async update(

    @Param('id')
    id: string,

    @UploadedFile()
    file: Express.Multer.File,

    @Body()
    body: UpdateMenuDto,

  ) {

    if (file) {

      const uploaded: any =
        await this.cloudinaryService.uploadImage(
          file,
        );

      body.image =
        uploaded.secure_url;

    }

    return this.menuService.update(
      +id,
      body,
    );

  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {

    return this.menuService.remove(
      +id,
    );

  }

}