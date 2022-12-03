import { SpacingsRequestBody, SpacingsRequestParams, SpacingsResponse } from '../dtos/spacings.dto';

export type GetSpacings = (params: SpacingsRequestParams) => Promise<SpacingsResponse>;
export type CreateSpacings = (body: SpacingsRequestBody) => Promise<SpacingsResponse>;
export type UpdateSpacings = (params: SpacingsRequestParams, body: SpacingsRequestBody) => Promise<SpacingsResponse>;
export type DeleteSpacings = (params: SpacingsRequestParams) => Promise<SpacingsResponse>;
