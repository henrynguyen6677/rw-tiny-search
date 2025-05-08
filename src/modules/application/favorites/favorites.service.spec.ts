import {Test, TestingModule} from '@nestjs/testing';
import {FavoritesService} from './favorites.service';
import {DatabaseModule} from '../../infra/database/database.module';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [FavoritesService],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
