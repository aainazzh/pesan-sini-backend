import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { TableService }
from './table.service';

@Controller('table')
export class TableController {

  constructor(
    private readonly tableService: TableService,
  ) {}

  @Post()
  create(
    @Body() body: any,
  ) {

    return this.tableService.create(body);

  }

  @Get()
  findAll() {

    return this.tableService.findAll();

  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {

    return this.tableService.findOne(+id);

  }

  @Patch(':id')
  update(

    @Param('id') id: string,

    @Body() body: any,

  ) {

    return this.tableService.update(
      +id,
      body,
    );

  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {

    return this.tableService.remove(+id);

  }

}