import {Test, TestingModule} from '@nestjs/testing';
import {StoresService} from './stores.service';
import {DatabaseModule} from '../../infra/database/database.module';
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
});
