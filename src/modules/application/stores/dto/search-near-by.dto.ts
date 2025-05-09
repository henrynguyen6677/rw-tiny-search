import {IsNotEmpty, IsNumber, IsString, IsOptional} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import {TYPES} from '../../../../lib/constants/types.constant';

export class SearchNearByDto {
  @ApiProperty({
    description: 'Latitude of the location',
    type: Number,
    default: 21,
  })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @ApiProperty({
    description: 'Longitude of the location',
    type: Number,
    default: 105,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  lng: number;

  @ApiProperty({
    description: 'Radius in meters',
    type: Number,
    required: false,
    default: 100000,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  radius?: number;

  @ApiProperty({
    description: 'Name of stores',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Type of store',
    required: false,
    enum: TYPES,
  })
  @IsOptional()
  type?: string;

  @ApiProperty({
    description: 'Page number',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    description: 'Limit number',
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}
