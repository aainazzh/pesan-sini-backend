import { 
  Injectable, 
  BadRequestException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

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

  // DI SINI KITA TAMBAHKAN PROTEKSI (TRY-CATCH)
  async remove(id: number) {
    try {
      // Coba hapus datanya dari database
      const deletedMenu = await this.prisma.menu.delete({
        where: { id },
      });
      return deletedMenu;
    } catch (error: any) {
      // P2003 adalah kode error Prisma kalau data masih berelasi (nyangkut di Foreign Key)
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Menu ini tidak bisa dihapus karena masih tercatat di riwayat pesanan/transaksi pelanggan.'
        );
      }
      
      // Kalau ada error lain yang tidak terduga
      console.error(error);
      throw new InternalServerErrorException('Terjadi kesalahan di server saat menghapus menu.');
    }
  }
}