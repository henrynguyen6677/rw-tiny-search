import {Injectable} from '@nestjs/common';
import {SearchNearByDto} from './dto/search-near-by.dto';
import {PrismaService} from '../../infra/database/prisma.service';
@Injectable()
export class StoresService {
  constructor(prismaService: PrismaService) {}
  searchNearBy(q: SearchNearByDto) {
    // TODO: Implement the logic to search for stores near the given coordinates
    // For mysql database
    // 1. Connect to the database
    // 2. Create a query to find stores within the given radius
    // 3. Apply haversine formula to calculate distance
    // 4. Return the results
    // 5. Close the database connection
    // 6. Handle errors and exceptions
    // 7. Return the results in a structured format
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
    return `${q.lat}, ${q.lng}, ${q.radius}`;
  }
}
