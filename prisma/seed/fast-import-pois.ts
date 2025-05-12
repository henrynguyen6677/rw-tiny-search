import {PrismaClient} from '@prisma/client';
import {promises as fs} from 'fs';
import axios from 'axios';

type Element = {
  id: number;
  type: string;
  tags: {
    name: string;
    amenity: string;
  };
  center?: {
    lat: number;
    lon: number;
  };
  lat?: number;
  lon?: number;
}


async function importPOIsToDatabase(element: Element[] = []) {
  const prisma = new PrismaClient();

  try {
    const batchSize = 1000; // Number of records to insert in each batch
    const totalElements = element.length;
    const totalBatches = Math.ceil(totalElements / batchSize);
    console.log(`Total elements: ${totalElements}`);
    console.log(`Total batches: ${totalBatches}`);
    for (let batch = 0; batch < totalBatches; batch++) {
      const start = batch * batchSize;
      const end = Math.min(start + batchSize, totalElements);
      const poisBatch = element.slice(start, end);

      const upsertPromises = poisBatch.map(async (poi) => {
        const {id, type, tags, center} = poi;
        const lat = Number(center?.lat || poi.lat);
        const lon = Number(center?.lon || poi.lon);
        if (!lat || !lon) {
          console.error(`Invalid coordinates for POI with ID ${id}`);
          return;
        }
        if (!tags || !tags.name) {
          console.error(`Missing tags for POI with ID ${id}`);
          return;
        }
        const storeId = `${type}-${id}`;
        return prisma.store.upsert({
          where: {id: storeId},
          update: {
            type: tags.amenity || '',
            address: '', // TODO: Add address if available
            name: tags.name || '',
            tags: tags,
            latitude: lat,
            longitude: lon,
          },
          create: {
            id: storeId,
            type: tags.amenity || '',
            address: '', // TODO: Add address if available
            name: tags.name || '',
            tags: tags,
            latitude: lat,
            longitude: lon,
          },
        });
      });

      await Promise.all(upsertPromises);
      console.log(`Processed batch ${batch + 1} of ${totalBatches}`);
    }
  } catch (error) {
    console.error('Error importing POIs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function fastImportPOIs() {
  //const pois: Element[] | undefined = await getOverpassData(overpassQuery);
  // import file json
  const filePath = __dirname + '/overpass_response_100k.json';

  const pois: Element[] = JSON.parse(await fs.readFile(filePath, 'utf-8')).elements;
  importPOIsToDatabase(pois);
  console.log('Done!');
}
