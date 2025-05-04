import {importPOIs} from './import-pois';

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

async function main() {
  await importPOIs();
}

