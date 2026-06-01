import { 
  Injectable, 
  BadRequestException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  create(body: CreateMenuDto) {
    return this.prisma.menu.create({
      data: body,
    });
  }

  findAll() {
    return this.prisma.menu.findMany({
      include: {
        category: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  update(id: number, body: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data: body,
    });
  }

  async remove(id: number) {
    try {
      // Cari menu untuk mengecek apakah ada file gambarnya
      const menu = await this.prisma.menu.findUnique({ where: { id } });

      if (!menu) {
        throw new BadRequestException('Menu tidak ditemukan di database.');
      }

      // Hapus dulu menu ini dari semua riwayat nota pesanan (OrderItem)
      await this.prisma.orderItem.deleteMany({
        where: { menuId: id }
      });

      // Setelah riwayatnya bersih, baru hapus menunya dari daftar Menu
      const deletedMenu = await this.prisma.menu.delete({
        where: { id },
      });

      // Bersihkan file fisik gambar (Kalau ada dan belum dihapus Railway)
      if (menu.image) {
        const imagePath = path.join(process.cwd(), menu.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      return deletedMenu;

    } catch (error: any) {
      console.error(error);
      throw new InternalServerErrorException('Terjadi kesalahan sistem saat menghapus menu.');
    }
  }
}