import { Controller, Get, Query } from '@nestjs/common';
import { StoresService } from './stores.service';
import { SearchNearByDto } from './dto/search-near-by.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get('search')
  searchNearBy(@Query() q: SearchNearByDto) {
    return this.storesService.searchNearBy(q);
  }
}
