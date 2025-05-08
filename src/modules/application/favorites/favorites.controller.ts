import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get('find/:userId')
  findByUserId(@Param('userId') userId: number) {
    return this.favoritesService.findByUserId(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.favoritesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.favoritesService.remove(+id);
  }
}
