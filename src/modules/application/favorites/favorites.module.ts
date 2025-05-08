import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DatabaseModule } from '../../infra/database/database.module'; // Adjust the import path as necessary

@Module({
  imports: [
    DatabaseModule, // Assuming you have a database module to import
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
