import {Test, TestingModule} from '@nestjs/testing';
import {StoresService} from './stores.service';
import {DatabaseModule} from '../../infra/database/database.module';
import {SearchNearByDto} from './dto/search-near-by.dto';
import {TYPES} from '../../../lib/constants/types.constant';
import {StoreWithDistanceResponse} from './entities/store.entity';
describe('StoresService', () => {
  let service: StoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoresService],
      imports: [DatabaseModule], // Assuming DatabaseModule is imported here
    }).compile();

    service = module.get<StoresService>(StoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return a list store by type cafe', async () => {
    const mockQuery: SearchNearByDto = {
      lat: 0,
      lng: 0,
      radius: 64 * 1000 * 1000,
      type: TYPES.cafe,
    };
    const result: StoreWithDistanceResponse[] = await service.searchNearBy(mockQuery);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((store) => {
      expect(store).toHaveProperty('id');
      expect(store).toHaveProperty('name');
      expect(store).toHaveProperty('address');
      expect(store).toHaveProperty('type');
      expect(store).toHaveProperty('distance');
      expect(store).toHaveProperty('latitude');
      expect(store).toHaveProperty('longitude');
      expect(store.type).toBe(TYPES.cafe);
    })
  });
});
