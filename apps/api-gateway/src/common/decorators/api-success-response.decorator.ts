import { applyDecorators, HttpStatus, Type } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";

export function ApiSuccessResponse<TModel extends Type<any>>(
  model: TModel,
  status = HttpStatus.OK,
  isArray = false,
) {
  const dataSchema = isArray
    ? { type: "array", items: { $ref: getSchemaPath(model) } }
    : { $ref: getSchemaPath(model) };

  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(model) },
          { properties: { statusCode: { example: status }, data: dataSchema } },
        ],
      },
    }),
  );
}
