import {IsNotEmpty, IsNumber, IsOptional} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
export class SearchNearByDto {
  @ApiProperty({
    description: 'Latitude of the location',
    type: Number,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  lat: number;

  @ApiProperty({
    description: 'Longitude of the location',
    type: Number,
  })
  @IsNotEmpty()
  @Type(() => Number)
  lng: number;

  @ApiProperty({
    description: 'Radius in meters',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  radius?: number;

  @ApiProperty({
    description: 'Type of store',
    type: String,
    required: false,
  })
  @IsOptional()
  type?: string;
}
