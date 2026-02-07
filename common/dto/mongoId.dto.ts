import { IsMongoId } from 'class-validator';

export class MongoIdDto {
  @IsMongoId({ message: 'Invalid MongoDB ID' })
  id: string;
}

export class MongoIdsDto {
  @IsMongoId({ each: true, message: 'Invalid MongoDB ID in array' })
  ids: string[];
}
