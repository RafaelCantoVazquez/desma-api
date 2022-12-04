import {
  FontsRequestBody,
  FontsRequestParams,
  FontsResponse,
} from '../dtos/fonts.dto';

export type GetFonts = (params: FontsRequestParams) => Promise<FontsResponse>;
export type CreateFonts = (body: FontsRequestBody) => Promise<FontsResponse>;
export type UpdateFonts = (
  params: FontsRequestParams,
  body: FontsRequestBody
) => Promise<FontsResponse>;
export type DeleteFonts = (
  params: FontsRequestParams
) => Promise<FontsResponse>;
