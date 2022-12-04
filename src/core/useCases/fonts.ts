import {
  FontsRequestBody,
  FontsRequestParams,
  FontsResponse,
} from '../dtos/fonts.dto';
import {
  CreateFonts,
  DeleteFonts,
  GetFonts,
  UpdateFonts,
} from '../interfaces/fontsRepository';

export const fontsService = Object.freeze({
  makeGetFonts: (getFonts: GetFonts) => makeGetFonts(getFonts),
  makeCreateFonts: (createFonts: CreateFonts) => makeCreateFonts(createFonts),
  makeUpdateFonts: (updateFonts: UpdateFonts) => makeUpdateFonts(updateFonts),
  makeDeleteFonts: (deleteFonts: DeleteFonts) => makeDeleteFonts(deleteFonts),
});

const makeGetFonts =
  (getFonts: GetFonts) =>
  async (params: FontsRequestParams): Promise<FontsResponse> => {
    const fonts = await getFonts(params);
    return fonts;
  };

const makeCreateFonts =
  (createFonts: CreateFonts) =>
  async (body: FontsRequestBody): Promise<FontsResponse> => {
    const fonts = await createFonts(body);
    return fonts;
  };

const makeUpdateFonts =
  (updateFonts: UpdateFonts) =>
  async (
    params: FontsRequestParams,
    body: FontsRequestBody
  ): Promise<FontsResponse> => {
    const fonts = await updateFonts(params, body);
    return fonts;
  };

const makeDeleteFonts =
  (deleteFonts: DeleteFonts) =>
  async (params: FontsRequestParams): Promise<FontsResponse> => {
    const fonts = await deleteFonts(params);
    return fonts;
  };
