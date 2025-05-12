import {importPOIs} from './import-pois';
import {fastImportPOIs} from './fast-import-pois';
import {fakeUsers} from './fake-users';
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

async function main(): Promise<void> {
  const isSeedUsers = process.argv.includes('--seed-users');
  const isSeedPOIs = process.argv.includes('--seed-pois');
  const isFastSeedPOIs = process.argv.includes('--fast-seed-pois');
  if (!isSeedUsers && !isSeedPOIs && !isFastSeedPOIs) {
    console.log('Please specify --seed-users or --seed-pois or --fast-seed-pois');
    return
  }
  if (isSeedPOIs) {
    console.log('Seeding POIs...');
    await importPOIs();
  }
  if (isSeedUsers) {
    console.log('Seeding users...');
    await fakeUsers();
  }
  if (isFastSeedPOIs) {
    console.log('Seeding POIs fast...');
    await fastImportPOIs();
  }
  console.log('Seeding done!');
}

