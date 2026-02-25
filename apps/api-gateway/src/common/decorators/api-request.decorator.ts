import { applyDecorators } from "@nestjs/common";
import {
  ApiParam,
  ApiParamOptions,
  ApiQuery,
  ApiQueryOptions,
} from "@nestjs/swagger";

type SingleOrArray<T> = T | T[];

interface SwaggerRequestConfig {
  params?: SingleOrArray<ApiParamOptions>;
  queries?: SingleOrArray<ApiQueryOptions>;
}

export function ApiRequestDetails(
  config: SwaggerRequestConfig,
): MethodDecorator {
  const decorators: MethodDecorator[] = [];

  // Handle Params
  if (config?.params) {
    const paramArray = Array.isArray(config.params)
      ? config.params
      : [config.params];

    decorators.push(...paramArray.map((param) => ApiParam(param)));
  }

  // Handle Queries
  if (config?.queries) {
    const queryArray = Array.isArray(config.queries)
      ? config.queries
      : [config.queries];

    decorators.push(...queryArray.map((query) => ApiQuery(query)));
  }

  return applyDecorators(...decorators);
}
