
import {writeFileSync} from 'fs';

async function generateOverpassResponse(count: number, filename: string) {
  const elements: {
    id: number;
    type: string;
    lat: number;
    lon: number;
    name: string;
    tags: {[key: string]: string};
  }[] = [];
  const baseLat = 21.0278;
  const baseLon = 105.8342;
  const latRange = 10;
  const lonRange = 10;
  const amenities = ["restaurant", "post_office", "cafe", "place_of_worship", "shop"];
  const names = ["Quán Ăn A", "Bưu Điện Trung Tâm", "Cafe Sách", "Đình Làng", "Siêu Thị Mini"];
  const streets = ["Phố Cổ", "Đường Láng", "Vành Đai 2", "Trần Duy Hưng", "Nguyễn Trãi"];
  const countries = ["VN"];

  for (let i = 0; i < count; i++) {
    const lat = baseLat + (Math.random() - 0.5) * latRange;
    const lon = baseLon + (Math.random() - 0.5) * lonRange;
    const amenity = amenities[Math.floor(Math.random() * amenities.length)];
    const tags: {[key: string]: string} = {amenity};
    tags.name = names[Math.floor(Math.random() * 100) % names.length];
    tags['addr:country'] = countries[Math.floor(Math.random() * countries.length)];
    tags['addr:housenumber'] = Math.floor(Math.random() * 300) + 1 + '';
    tags['addr:street'] = streets[Math.floor(Math.random() * streets.length)];
    elements.push({
      type: i % 3 === 0 ? "node" : "way",
      id: i + 1,
      lat,
      lon,
      name: tags.name,
      tags
    });
  }

  const overpassResponse = {
    version: 0.6,
    generator: "Overpass API 0.7.62.5 1bd436f1",
    osm3s: {
      timestamp_osm_base: new Date().toISOString().slice(0, 19) + "Z",
      copyright: "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
    },
    elements,
  };

  try {
    await writeFileSync(filename, JSON.stringify(overpassResponse, null, 2), 'utf-8');
    console.log(`Wrote ${count} elements to ${filename}`);
  } catch (error) {
    console.error(`Error writing to file ${filename}:`, error);
  }
}

async function main() {
  console.log('Start generating Overpass response files...');
  await generateOverpassResponse(100000, 'overpass_response_100k.json');
  await generateOverpassResponse(1000000, 'overpass_response_1m.json');
  console.log('Finished generating Overpass response files.');
}

main().catch(console.error);
