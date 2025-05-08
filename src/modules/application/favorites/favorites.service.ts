import {Injectable} from '@nestjs/common';
import {CreateFavoriteDto} from './dto/create-favorite.dto';
import {UpdateFavoriteDto} from './dto/update-favorite.dto';
import {PrismaService} from '../../infra/database/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async create(createFavoriteDto: CreateFavoriteDto) {
    const existingFavorite = await this.prisma.favorite.findFirst({
      where: {
        userId: createFavoriteDto.userId,
        storeId: createFavoriteDto.storeId,
      },
    });
    if (existingFavorite) {
      return existingFavorite;
    }
    // Check if the store exists
    const store = await this.prisma.store.findUnique({
      where: {
        id: createFavoriteDto.storeId,
      },
    });
    if (!store) {
      throw new Error('Store not found');
    }
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: {
        id: createFavoriteDto.userId,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const favorite = await this.prisma.favorite.create({
      data: {
        userId: createFavoriteDto.userId,
        storeId: createFavoriteDto.storeId,
      },
    });
    return favorite;
  }

  findAll() {
    return `This action returns all favorites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
