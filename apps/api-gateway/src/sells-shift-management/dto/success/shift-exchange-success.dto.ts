import { ApiProperty } from "@nestjs/swagger";
import { SuccessResponseDto } from "apps/api-gateway/src/common/dto/success-response.dto";
import { Methods } from "apps/api-gateway/src/common/enum/methods.enum";
import { ShiftExchangeStatus } from "apps/workforce-service/src/schemas/shift-exchange.schema";

export class ShiftExchangeRequestSuccessDto extends SuccessResponseDto<any> {
  @ApiProperty({ example: "Shift exchange request submitted successfully" })
  declare message: string;

  @ApiProperty({ example: Methods.POST })
  declare method: Methods.POST;

  @ApiProperty({ example: "api/sells-shift-management/exchange/request" })
  declare endpoint: string;

  @ApiProperty({
    example: {
      user: "65f1b2c3d4e5f67890123456",
      exchangeDate: "2024-05-01T00:00:00.000Z",
      originalShift: "MORNING",
      newShift: "EVENING",
      reason: "Personal appointment",
      status: ShiftExchangeStatus.PENDING,
      approvedBy: null,
      _id: "65f1b2c3d4e5f67890123458",
      createdAt: "2026-02-23T12:00:00.000Z",
      updatedAt: "2026-02-23T12:00:00.000Z",
    },
  })
  declare data: any;
}

export class ApproveShiftExchangeSuccessDto extends SuccessResponseDto<any> {
  @ApiProperty({ example: "Shift exchange request approved successfully" })
  declare message: string;

  @ApiProperty({ example: Methods.PATCH })
  declare method: Methods.PATCH;

  @ApiProperty({ example: "api/sells-shift-management/exchange/approve/:exchangeId" })
  declare endpoint: string;

  @ApiProperty({
    example: {
      user: "65f1b2c3d4e5f67890123456",
      exchangeDate: "2024-05-01T00:00:00.000Z",
      originalShift: "MORNING",
      newShift: "EVENING",
      reason: "Personal appointment",
      status: ShiftExchangeStatus.APPROVED,
      approvedBy: "65f1b2c3d4e5f67890123457",
      _id: "65f1b2c3d4e5f67890123458",
      createdAt: "2026-02-23T12:00:00.000Z",
      updatedAt: "2026-02-23T12:00:00.000Z",
    },
  })
  declare data: any;
}

export class RejectShiftExchangeSuccessDto extends SuccessResponseDto<any> {
  @ApiProperty({ example: "Shift exchange request rejected successfully" })
  declare message: string;

  @ApiProperty({ example: Methods.PATCH })
  declare method: Methods.PATCH;

  @ApiProperty({ example: "api/sells-shift-management/exchange/reject/:exchangeId" })
  declare endpoint: string;

  @ApiProperty({
    example: {
      user: "65f1b2c3d4e5f67890123456",
      exchangeDate: "2024-05-01T00:00:00.000Z",
      originalShift: "MORNING",
      newShift: "EVENING",
      reason: "Rejected: Not enough staff on morning shift. Original reason: Personal appointment",
      status: ShiftExchangeStatus.REJECTED,
      approvedBy: "65f1b2c3d4e5f67890123457",
      _id: "65f1b2c3d4e5f67890123458",
      createdAt: "2026-02-23T12:00:00.000Z",
      updatedAt: "2026-02-23T12:00:00.000Z",
    },
  })
  declare data: any;
}

export class GetMyShiftExchangesSuccessDto extends SuccessResponseDto<any[]> {
  @ApiProperty({ example: "User shift exchanges retrieved" })
  declare message: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/sells-shift-management/exchange/my" })
  declare endpoint: string;

  @ApiProperty({
    example: [
      {
        user: "65f1b2c3d4e5f67890123456",
        exchangeDate: "2024-05-01T00:00:00.000Z",
        originalShift: "MORNING",
        newShift: "EVENING",
        reason: "Personal appointment",
        status: ShiftExchangeStatus.APPROVED,
        approvedBy: "65f1b2c3d4e5f67890123457",
        _id: "65f1b2c3d4e5f67890123458",
        createdAt: "2026-02-23T12:00:00.000Z",
        updatedAt: "2026-02-23T12:00:00.000Z",
      },
    ],
  })
  declare data: any[];
}

export class GetPendingShiftExchangesSuccessDto extends SuccessResponseDto<any[]> {
  @ApiProperty({ example: "Pending shift exchanges retrieved" })
  declare message: string;

  @ApiProperty({ example: Methods.GET })
  declare method: Methods.GET;

  @ApiProperty({ example: "api/sells-shift-management/exchange/pending" })
  declare endpoint: string;

  @ApiProperty({
    example: [
      {
        user: {
          _id: "65f1b2c3d4e5f67890123456",
          name: "John Doe",
          employeeId: "EMP001",
        },
        exchangeDate: "2024-05-01T00:00:00.000Z",
        originalShift: "MORNING",
        newShift: "EVENING",
        reason: "Personal appointment",
        status: ShiftExchangeStatus.PENDING,
        approvedBy: null,
        _id: "65f1b2c3d4e5f67890123458",
        createdAt: "2026-02-23T12:00:00.000Z",
        updatedAt: "2026-02-23T12:00:00.000Z",
      },
    ],
  })
  declare data: any[];
}
