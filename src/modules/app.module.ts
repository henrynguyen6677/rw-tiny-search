import { Module } from '@nestjs/common';
import { StoresModule } from './application/stores/stores.module';
import { FavoritesModule } from './application/favorites/favorites.module';

import { DatabaseModule } from './infra/database/database.module';
const applicationModules = [StoresModule, FavoritesModule];
const infraStructureModules = [DatabaseModule];
@Module({
  imports: [...applicationModules, ...infraStructureModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
