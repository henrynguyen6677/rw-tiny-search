import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { DatabaseModule } from '../../infra/database/database.module';

describe('FavoritesController', () => {
  let controller: FavoritesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [FavoritesController],
      providers: [FavoritesService],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a favorite', async () => {
    const createFavoriteDto = {
      userId: 1,
      storeId: 'node-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(controller, 'create').mockImplementation(async () => {
      return new Promise((resolve) => resolve({ id: 1, ...createFavoriteDto }));
    });
    const result = await controller.create(createFavoriteDto);
    expect(result).toEqual({ id: 2, ...createFavoriteDto });
  });
  it('should find a favorite by userId', async () => {
    const favorites = [
      {
        id: 2,
        userId: 1,
        storeId: 'node-1000087449',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: 1,
          name: 'Jessica Jones',
          email: 'jessica.jones@example.com',
          password: 'Jessica123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        store: {
          id: 'node-1000087449',
          name: 'Nhà Hàng Chả Cá Văn Miếu',
          address: '',
          type: 'restaurant',
          latitude: 21.0296628,
          longitude: 105.8369362,
          tags: {
            name: 'Nhà Hàng Chả Cá Văn Miếu',
            amenity: 'restaurant',
            cuisine: 'asian',
            'addr:city': 'Hà Nội',
            'addr:street': 'Phố Văn Miếu',
            'addr:country': 'VN',
            'addr:district': 'Đống Đa',
            'addr:province': 'Hà Nội',
            'addr:housenumber': '9',
            'addr:subdistrict': 'Văn Miếu',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ];
    const userId = 1;
    jest.spyOn(controller, 'findByUserId').mockImplementation(async () => {
      return new Promise((resolve) => resolve(favorites));
    });
    const result = await controller.findByUserId(userId);
    expect(result).toEqual(favorites);
  });
  it('should find a favorite by id', async () => {
    const favorite = {
      id: 2,
      user: {
        id: 1,
        name: 'Jessica Jones',
        email: 'jessica.jones@example.com',
      },
      store: {
        id: 'node-1000087449',
        name: 'Nhà Hàng Chả Cá Văn Miếu',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const id = 1;
    jest.spyOn(controller, 'findOne').mockImplementation(async () => {
      return new Promise((resolve) => resolve(favorite));
    });
    const result = await controller.findOne(id);
    expect(result).toEqual(favorite);
  });
  it('should remove a favorite', async () => {
    const favorite = {
      id: 1,
      userId: 1,
      storeId: 'node-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(controller, 'remove').mockImplementation(async () => {
      return new Promise((resolve) => resolve(favorite));
    });
    const result = await controller.remove(favorite.id);
    expect(result).toEqual({ ...favorite });
  });
});
