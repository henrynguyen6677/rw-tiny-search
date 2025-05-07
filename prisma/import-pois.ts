import {PrismaClient} from '@prisma/client';
import {promises as fs} from 'fs';
import axios from 'axios';


const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';


// Example bounding box (lat1, lon1, lat2, lon2)
const BOUNDING_BOX = '21.028,105.83,21.032,105.84';

const POI_TAGS_TO_QUERY = [
  'amenity=restaurant',
  'amenity=cafe',
  'amenity=hospital',
  'amenity=school',
  'amenity=bank',
  'amenity=pharmacy',
  'amenity=supermarket',
  'amenity=post_office',
  'amenity=library',
  'amenity=bar',
  'amenity=bus_station',
  'amenity=parking',
  'amenity=university',
  'amenity=place_of_worship',
  'amenity=fire_station',
  'amenity=police',
  'amenity=theatre',
];


const queryConditions = POI_TAGS_TO_QUERY.map(tag => {
  const [key, value] = tag.split('=');
  return `node["${key}"="${value}"](${BOUNDING_BOX});way["${key}"="${value}"](${BOUNDING_BOX});relation["${key}"="${value}"](${BOUNDING_BOX});`;
}).join('');

const overpassQuery = `
    [out:json];
    (${queryConditions});
    out center;
  `;
console.log('Overpass Query:\n', overpassQuery);

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

type OverpassResponse = {
  data: {
    elements: Element[];
  };
}

async function importPOIsToDatabase(element: Element[] = []) {
  const prisma = new PrismaClient();
  try {
    for (const poi of element) {
      const {id, type, tags, center} = poi;
      const lat = Number(center?.lat || poi.lat);
      const lon = Number(center?.lon || poi.lon);
      if (!lat || !lon) {
        console.error(`Invalid coordinates for POI with ID ${id}`);
        continue;
      }
      if (!tags || !tags.name) {
        console.error(`Missing tags for POI with ID ${id}`);
        continue;
      }
      const storeId = `${type}-${id}`;
      await prisma.store.upsert({
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
    }
  } catch (error) {
    console.error('Error importing POIs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function getOverpassData(query: string): Promise<Element[] | undefined> {
  try {
    const response: OverpassResponse = await axios.post(OVERPASS_API_URL, query, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    await fs.writeFile('pois.json', JSON.stringify(response.data, null, 2));
    console.log('Save data to pois.json successfully!');
    return response.data.elements;
  } catch (error) {
    console.error(error);
  }
}

export async function importPOIs() {
  console.log('Start importing POIs from Overpass API...');
  const pois: Element[] | undefined = await getOverpassData(overpassQuery);
  if (!pois) {
    console.error('No POIs found');
    return;
  }
  await importPOIsToDatabase(pois);
  console.log('Done!');
}
