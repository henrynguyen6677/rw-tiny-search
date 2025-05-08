import { Test, TestingModule } from '@nestjs/testing';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { DatabaseModule } from '../../infra/database/database.module';
import { SearchNearByDto } from './dto/search-near-by.dto';

describe('StoresController', () => {
  let controller: StoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [StoresController],
      providers: [StoresService],
    }).compile();

    controller = module.get<StoresController>(StoresController);
  });

  it('should return a list of stores', async () => {
    const mockQuery: SearchNearByDto = {
      lat: 0,
      lng: 0,
      radius: 64 * 1000 * 1000,
    };
    const result = await controller.searchNearBy(mockQuery);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});
