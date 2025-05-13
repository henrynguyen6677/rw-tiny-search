import {Injectable} from '@nestjs/common';
import {SearchNearByDto} from './dto/search-near-by.dto';
import {PrismaService} from '../../infra/database/prisma.service';
import {Prisma} from '@prisma/client';
import {
  StoreWithDistance,
  StoreWithDistanceResponse,
} from './interface/store';
import {PaginatedResponse} from './interface/paginated-response';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  getSearchStoreString(
    lat: number,
    lng: number,
    radius: number,
    options: {
      type?: string;
      name?: string;
      skip?: number;
      take?: number;
    },
  ) {
    const {type, name, skip, take} = options;
    const typeWhereClause = type
      ? Prisma.sql`type = ${type} and`
      : Prisma.sql``;
    const nameWhereClause = name
      ? Prisma.sql` MATCH(name) AGAINST(${name} IN NATURAL LANGUAGE MODE) and`
      : Prisma.sql``;
    const limitClause = take ? Prisma.sql`LIMIT ${take}` : Prisma.sql``;
    const offsetClause = skip ? Prisma.sql`OFFSET ${skip}` : Prisma.sql``;
    const safeQuery = Prisma.sql`
    select 
      id, name, address, type, latitude, longitude,
      ST_Distance_Sphere(POINT(longitude, latitude), POINT(${lng}, ${lat})) as distance
    from Store 
    where
      ${typeWhereClause}
      ${nameWhereClause}
      ST_Distance_Sphere(point(${lng}, ${lat}), point(longitude, latitude)) <= ${radius}
    order by distance asc
    ${limitClause}
    ${offsetClause}
      `;

    return safeQuery;
  }

  async searchStores(
    lat: number,
    lng: number,
    radius: number,
    options: {
      type?: string;
      name?: string;
      skip?: number;
      take?: number;
    },
  ) {
    const safeQuery = this.getSearchStoreString(lat, lng, radius, options);

    const stores = await this.prisma.$queryRaw<StoreWithDistance[]>(safeQuery);

    return stores;
  }
  async searchNearBy(q: SearchNearByDto): Promise<PaginatedResponse<StoreWithDistanceResponse>> {
    const {page = 1, limit = 10} = q;
    const radius = q.radius || 100000;
    const stores = await this.searchStores(q.lat, q.lng, radius, {
      type: q.type,
      name: q.name,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: stores.map((store) => ({
        id: store.id,
        name: store.name,
        type: store.type,
        address: store.address,
        distance: store.distance,
        latitude: store.lat,
        longitude: store.lng,
      })),
      meta: {
        page,
        limit,
        total: stores.length,
      },
    };
  }
}
