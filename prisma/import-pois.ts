import {promises as fs} from 'fs';
import axios from 'axios';

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';


// Example bounding box (lat1, lon1, lat2, lon2)
const BOUNDING_BOX = '21.028,105.83,21.032,105.84';

const POI_TAGS_TO_QUERY = [
  'amenity=restaurant',
  'amenity=cafe',
  'amenity=hospital',
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

async function getOverpassData(query: string) {
  try {
    const response = await axios.post(OVERPASS_API_URL, query, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

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
