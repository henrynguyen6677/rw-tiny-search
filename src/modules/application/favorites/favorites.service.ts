import {Injectable} from '@nestjs/common';
import {CreateFavoriteDto} from './dto/create-favorite.dto';
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

  findByUserId(userId: number) {
    return this.prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        store: true,
      }
    });
  }

  findOne(id: number) {
    const favorite = this.prisma.favorite.findUnique({
      where: {
        id,
      },
    });
    if (!favorite) {
      throw new Error('Favorite not found');
    }
    return this.prisma.favorite.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        // Include the user and store details
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    const favorite = this.prisma.favorite.findUnique({
      where: {
        id,
      },
    });
    if (!favorite) {
      throw new Error('Favorite not found');
    }
    return this.prisma.favorite.delete({
      where: {
        id,
      },
    });
  }
}
