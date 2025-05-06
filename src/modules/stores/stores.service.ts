import {Injectable} from '@nestjs/common';
import {SearchNearByDto} from './dto/search-near-by.dto';

@Injectable()
export class StoresService {
  searchNearBy(q: SearchNearByDto) {
    return `${q.lat}, ${q.lng}, ${q.radius}`;
  }
}
