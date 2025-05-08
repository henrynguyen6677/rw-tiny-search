import {Test, TestingModule} from '@nestjs/testing';
import {StoresController} from './stores.controller';
import {StoresService} from './stores.service';
import {DatabaseModule} from '../../infra/database/database.module';

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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
