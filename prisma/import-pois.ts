import {promises as fs} from 'fs';
import axios from 'axios';
import {PrismaClient} from '@prisma/client';


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

async function importPOIs(element: Element[] = []) {
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
      }
      const storeId = `${type}-${id}`;
      await prisma.store.upsert({
        where: {id: storeId},
        update: {
          type,
          address: '', // TODO: Add address if available
          name: tags.name || '',
          tags: tags,
          latitude: lat,
          longitude: lon,
        },
        create: {
          id: storeId,
          type,
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

async function getOverpassData(query: string) {
  try {
    const response: OverpassResponse = await axios.post(OVERPASS_API_URL, query, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    // console.log('Response data:', response.data.elements);
    await importPOIs(response.data.elements);
    await fs.writeFile('pois.json', JSON.stringify(response.data, null, 2));
    console.log('Save data to pois.json successfully!');
  } catch (error) {
    console.error(error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })

async function main() {
  await getOverpassData(overpassQuery);
}
