import {
  Controller,
  Get,
} from '@nestjs/common';

import { ReportService }
from './report.service';

@Controller('report')
export class ReportController {

  constructor(
    private reportService: ReportService,
  ) {}

  @Get('daily')
  dailyReport() {

    return this.reportService.dailyReport();

  }

  @Get('weekly')
  weeklyReport() {

    return this.reportService.weeklyReport();

  }

  @Get('monthly')
  monthlyReport() {

    return this.reportService.monthlyReport();

  }

  @Get('yearly')
  yearlyReport() {

    return this.reportService.yearlyReport();

  }

}