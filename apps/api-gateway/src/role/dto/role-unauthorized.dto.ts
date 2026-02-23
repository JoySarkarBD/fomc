
import { ApiProperty } from '@nestjs/swagger';
import { CustomUnauthorizedDto } from 'apps/api-gateway/src/common/dto/custom-unauthorized.dto';
import { Methods } from 'apps/api-gateway/src/common/enum/methods.enum';

export class RolesUnauthorizedDto extends CustomUnauthorizedDto {
  @ApiProperty({ example: 'api/role' })
  declare endpoint: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;
}

export class RoleUnauthorizedDto extends CustomUnauthorizedDto {
  @ApiProperty({ example: 'api/role/:id' })
  declare endpoint: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;
}
