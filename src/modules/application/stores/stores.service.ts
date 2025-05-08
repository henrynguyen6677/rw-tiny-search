import {Injectable} from '@nestjs/common';
import {SearchNearByDto} from './dto/search-near-by.dto';
import {PrismaService} from '../../infra/database/prisma.service';
import {Prisma} from '@prisma/client';
import {StoreWithDistance, StoreWithDistanceResponse} from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  getSearchStoreString(type: string | undefined, lat: number, lng: number, radius: number) {
    const typeWhereClause = type ? Prisma.sql`type = ${type} and` : Prisma.sql``;
    const safeQuery = Prisma.sql`
    select 
      id, name, address, type, latitude, longitude,
      ST_Distance_Sphere(POINT(longitude, latitude), POINT(${lng}, ${lat})) as distance
    from Store 
    where
      ${typeWhereClause}
      ST_Distance_Sphere(point(${lng}, ${lat}), point(longitude, latitude)) <= ${radius}`;

    return safeQuery;
  }

  async searchStores(type: string | undefined, lat: number, lng: number, radius: number) {
    const safeQuery = this.getSearchStoreString(type, lat, lng, radius);

    const stores = await this.prisma.$queryRaw<StoreWithDistance[]>(safeQuery);

    return stores;
  }
  async searchNearBy(q: SearchNearByDto): Promise<StoreWithDistanceResponse[]> {
    const {lat, lng, type} = q;
    const radius = (q.radius ?? 1000);
    const stores = await this.searchStores(type, lat, lng, radius);

    return stores.map((store) => ({
      id: store.id,
      name: store.name,
      address: store.address,
      type: store.type,
      distance: store.distance,
      latitude: store.lat,
      longitude: store.lng,
    }));
    // TODO: Implement the logic to search for stores near the given coordinates
    // 8. Implement pagination if necessary
    // 9. Implement caching if necessary
    // 10. Implement logging if necessary
    // 11. Implement security measures if necessary
    // 12. Implement validation if necessary
    // 13. Implement testing if necessary
    // 14. Implement documentation if necessary
    // 15. Implement monitoring if necessary
    // 16. Implement alerting if necessary
    // 17. Implement backup and recovery if necessary
    // 18. Implement scaling if necessary
    // 19. Implement load balancing if necessary
    // 20. Implement failover if necessary
    // 21. Implement disaster recovery if necessary
    // 22. Implement high availability if necessary
    // 23. Implement redundancy if necessary
    // 24. Implement fault tolerance if necessary
    // 25. Implement performance optimization if necessary
    // 26. Implement security optimization if necessary
    // 27. Implement cost optimization if necessary
    // 28. Implement resource optimization if necessary
    // 29. Implement time optimization if necessary
    // 30. Implement space optimization if necessary
    // 31. Implement energy optimization if necessary
    // 32. Implement network optimization if necessary
    // 33. Implement database optimization if necessary
    // 34. Implement application optimization if necessary
  }
}
