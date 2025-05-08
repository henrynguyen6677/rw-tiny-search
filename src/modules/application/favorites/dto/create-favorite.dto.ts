import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';
import {Type} from 'class-transformer';

export class CreateFavoriteDto {

  @ApiProperty({
    description: 'User ID',
    default: 1,
  })
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @ApiProperty({
    description: 'Store ID',
    default: 'node-1000087449',
  })
  @IsString()
  @Type(() => String)
  storeId: string;
}
