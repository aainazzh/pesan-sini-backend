import {
  Injectable,
} from '@nestjs/common';

import {
  PaymentStatus,
} from '@prisma/client';

import { PrismaService }
from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async dailyReport() {

    const now = new Date();

    const start =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );

    const end =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
      );

    const orders =
      await this.prisma.order.findMany({

        where: {

          paymentStatus:
            PaymentStatus.PAID,

          createdAt: {

            gte: start,
            lte: end,

          },

        },

      });

    const totalRevenue =
      orders.reduce(
        (
          total,
          order,
        ) =>
          total +
          order.totalAmount,
        0,
      );

    return {

      period: 'daily',

      totalOrders:
        orders.length,

      totalRevenue,

    };

  }


  async monthlyReport() {

    const now = new Date();

    const firstDay =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
      );

    const lastDay =
      new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
      );

    const orders =
      await this.prisma.order.findMany({

        where: {

          paymentStatus:
            PaymentStatus.PAID,

          createdAt: {

            gte: firstDay,
            lte: lastDay,

          },

        },

      });

    const totalRevenue =
      orders.reduce(
        (
          total,
          order,
        ) =>
          total +
          order.totalAmount,
        0,
      );

    return {

      period: 'monthly',

      totalOrders:
        orders.length,

      totalRevenue,

    };

  }

  async yearlyReport() {

    const now = new Date();

    const firstDay =
      new Date(
        now.getFullYear(),
        0,
        1,
      );

    const lastDay =
      new Date(
        now.getFullYear(),
        11,
        31,
        23,
        59,
        59,
      );

    const orders =
      await this.prisma.order.findMany({

        where: {

          paymentStatus:
            PaymentStatus.PAID,

          createdAt: {

            gte: firstDay,
            lte: lastDay,

          },

        },

      });

    const totalRevenue =
      orders.reduce(
        (
          total,
          order,
        ) =>
          total +
          order.totalAmount,
        0,
      );

    return {

      period: 'yearly',

      totalOrders:
        orders.length,

      totalRevenue,

    };

  }

}