
import { ApiProperty } from '@nestjs/swagger';
import { CustomInternalServerErrorDto } from 'apps/api-gateway/src/common/dto/custom-internal-server-error.dto';
import { Methods } from 'apps/api-gateway/src/common/enum/methods.enum';

export class RolesInternalErrorDto extends CustomInternalServerErrorDto {
  @ApiProperty({ example: 'api/role' })
  declare endpoint: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;
}

export class RoleInternalErrorDto extends CustomInternalServerErrorDto {
  @ApiProperty({ example: 'api/role/:id' })
  declare endpoint: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;
}
