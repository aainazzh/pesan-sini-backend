import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import {
  PaymentStatus,
} from '@prisma/client';

import { PrismaService }
  from 'src/prisma/prisma.service';

import { CreateOrderDto }
  from './dto/create-order.dto';

import PDFDocument from 'pdfkit';
import * as fs from 'fs';

@Injectable()
export class OrderService {

  constructor(
    private prisma: PrismaService,
  ) { }

  async create(
    body: CreateOrderDto,
  ) {

    const table =
      await this.prisma.table.findUnique({
        where: {
          tableNumber:
            body.tableNumber,
        },
      });

    if (!table) {

      throw new NotFoundException(
        'Meja tidak ditemukan',
      );

    }

    let subtotal = 0;

    const orderItemsData: {
      menuId: number;
      quantity: number;
      subtotal: number;
    }[] = [];

    for (const item of body.items) {

      const menu =
        await this.prisma.menu.findUnique({
          where: {
            id: item.menuId,
          },
        });

      if (!menu) {

        throw new NotFoundException(
          `Menu ${item.menuId} tidak ditemukan`,
        );

      }

      const itemSubtotal =
        menu.price *
        item.quantity;

      subtotal += itemSubtotal;

      orderItemsData.push({

        menuId:
          menu.id,

        quantity:
          item.quantity,

        subtotal:
          itemSubtotal,

      });

    }

    const tax =
      Math.floor(subtotal * 0.11);

    const totalAmount =
      subtotal + tax;

    const order =
      await this.prisma.order.create({

        data: {

          customerName:
            body.customerName ||
            'Guest',

          tableId:
            table.id,

          paymentMethod:
            body.paymentMethod,

          // 👇 PERUBAHAN KE-1: Di awal selalu PENDING, tidak peduli QRIS atau CASH
          paymentStatus:
            PaymentStatus.PENDING,

          subtotal,
          tax,
          totalAmount,

          orderItems: {
            create:
              orderItemsData,
          },

        },

        include: {

          table: true,

          orderItems: {
            include: {
              menu: true,
            },
          },

        },

      });

    return {

      message:
        'Order berhasil dibuat',

      order,

    };

  }

  findAll() {

    return this.prisma.order.findMany({

      orderBy: {
        createdAt: 'desc',
      },

      include: {

        table: true,

        orderItems: {
          include: {
            menu: true,
          },
        },

      },

    });

  }

  findOne(id: number) {

    return this.prisma.order.findUnique({

      where: { id },

      include: {

        table: true,

        orderItems: {
          include: {
            menu: true,
          },
        },

      },

    });

  }

  async uploadProof(
    id: number,
    imageUrl: string,
  ) {

    return this.prisma.order.update({

      where: { id },

      data: {

        paymentProof:
          imageUrl,

        // 👇 PERUBAHAN KE-2: Status berubah ke WAITING_CONFIRMATION setelah bukti diupload
        paymentStatus:
          PaymentStatus.WAITING_CONFIRMATION,

      },

    });

  }

  async verifyPayment(
    id: number,
  ) {

    const order =
      await this.prisma.order.update({

        where: { id },

        data: {

          paymentStatus:
            PaymentStatus.PAID,

        },

        include: {

          table: true,

          orderItems: {
            include: {
              menu: true,
            },
          },

        },

      });

    const invoiceName =
      `invoice-order-${order.id}.pdf`;

    const invoicePath =
      `invoices/${invoiceName}`;

    const doc =
      new PDFDocument();

    doc.pipe(
      fs.createWriteStream(
        invoicePath,
      ),
    );

    doc.fontSize(20)
      .text('PesanSini Invoice');

    doc.moveDown();

    doc.fontSize(12)
      .text(
        `Order ID: ${order.id}`,
      );

    doc.text(
      `Customer: ${order.customerName}`,
    );

    doc.text(
      `Table: ${order.table.tableNumber}`,
    );

    doc.text(
      `Payment Method: ${order.paymentMethod}`,
    );

    doc.text(
      `Payment Status: ${order.paymentStatus}`,
    );

    doc.moveDown();

    doc.text('Items:');

    order.orderItems.forEach(
      (item) => {

        doc.text(
          `${item.menu.name} x ${item.quantity} = Rp${item.subtotal}`,
        );

      },
    );

    doc.moveDown();

    doc.text(
      `Subtotal: Rp${order.subtotal}`,
    );

    doc.text(
      `Tax: Rp${order.tax}`,
    );

    doc.text(
      `Total: Rp${order.totalAmount}`,
    );

    doc.end();

    return {

      message:
        'Payment berhasil diverifikasi',

      invoiceUrl:
        `http://localhost:3000/invoices/${invoiceName}`,

    };

  }

  async rejectPayment(
    id: number,
  ) {

    return this.prisma.order.update({

      where: { id },

      data: {

        paymentStatus:
          PaymentStatus.REJECTED,

      },

    });

  }

  async cancelOrder(
    id: number,
  ) {

    const order =
      await this.prisma.order.findUnique({

        where: {
          id,
        },

        include: {
          orderItems: true,
        },

      });

    if (!order) {

      throw new NotFoundException(
        'Pesanan tidak ditemukan',
      );

    }

    if (
      order.paymentStatus ===
      PaymentStatus.PAID
    ) {

      throw new BadRequestException(
        'Pesanan yang sudah dibayar tidak dapat dibatalkan',
      );

    }

    await this.prisma.orderItem.deleteMany({

      where: {
        orderId: id,
      },

    });

    await this.prisma.order.delete({

      where: {
        id,
      },

    });

    return {

      message:
        'Pesanan berhasil dibatalkan',

    };

  }

}