import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {StoresModule} from '../stores/stores.module';
import {FavoritesModule} from '../favorites/favorites.module';

@Module({
  imports: [StoresModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
