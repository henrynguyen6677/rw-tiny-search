import {importPOIs} from './import-pois';
import {fakeUsers} from './fake-users';
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

async function main(): Promise<void> {
  const isSeedUsesr = process.argv.includes('--seed-users');
  const isSeedPOIs = process.argv.includes('--seed-pois');
  if (!isSeedUsesr && !isSeedPOIs) {
    console.log('Please specify --seed-users or --seed-pois');
    return
  }
  if (isSeedPOIs) {
    console.log('Seeding POIs...');
    await importPOIs();
  }
  if (isSeedUsesr) {
    console.log('Seeding users...');
    await fakeUsers();
  }
  console.log('Seeding done!');
}

