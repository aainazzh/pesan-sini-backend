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

import { diskStorage }
from 'multer';

import { extname }
from 'path';

import { MenuService }
from './menu.service';

import { CreateMenuDto }
from './dto/create-menu.dto';

import { UpdateMenuDto }
from './dto/update-menu.dto';

@UseGuards(
  JwtAuthGuard,
)

@Controller('menu')
export class MenuController {

  constructor(
    private readonly menuService: MenuService,
  ) {}

  @Post()

  @UseInterceptors(

    FileInterceptor(

      'image',

      {

        storage: diskStorage({

          destination:
            './uploads',

          filename: (
            req,
            file,
            callback,
          ) => {

            const uniqueName =

              Date.now() +

              extname(
                file.originalname,
              );

            callback(
              null,
              uniqueName,
            );

          },

        }),

      },

    ),

  )

  create(

    @UploadedFile()
    file: Express.Multer.File,

    @Body() body: CreateMenuDto,

  ) {

    if (file) {

      body.image =
        `uploads/${file.filename}`;

    }

    return this.menuService.create(body);

  }

  @Get()
  findAll() {

    return this.menuService.findAll();

  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {

    return this.menuService.findOne(+id);

  }

  @Patch(':id')

  @UseInterceptors(

    FileInterceptor(

      'image',

      {

        storage: diskStorage({

          destination:
            './uploads',

          filename: (
            req,
            file,
            callback,
          ) => {

            const uniqueName =

              Date.now() +

              extname(
                file.originalname,
              );

            callback(
              null,
              uniqueName,
            );

          },

        }),

      },

    ),

  )

  update(

    @Param('id') id: string,

    @UploadedFile()
    file: Express.Multer.File,

    @Body() body: UpdateMenuDto,

  ) {

    if (file) {

      body.image =
        `uploads/${file.filename}`;

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

    return this.menuService.remove(+id);

  }

}