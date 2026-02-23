
import { ApiProperty } from '@nestjs/swagger';
import { CustomForbiddenDto } from 'apps/api-gateway/src/common/dto/custom-forbidden.dto';
import { Methods } from 'apps/api-gateway/src/common/enum/methods.enum';

export class RolesForbiddenDto extends CustomForbiddenDto {
  @ApiProperty({ example: 'api/role' })
  declare endpoint: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;
}

export class RoleForbiddenDto extends CustomForbiddenDto {
  @ApiProperty({ example: 'api/role/:id' })
  declare endpoint: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;
}
