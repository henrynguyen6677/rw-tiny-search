import {IsNotEmpty, IsNumber, IsString, IsOptional} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import {TYPES} from '../../../../lib/constants/types.constant';

export class SearchNearByDto {
  @ApiProperty({
    description: 'Latitude of the location',
    type: Number,
  })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @ApiProperty({
    description: 'Longitude of the location',
    type: Number,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
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
}
