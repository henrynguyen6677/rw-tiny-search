import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoresModule } from './modules/stores/stores.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [StoresModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
