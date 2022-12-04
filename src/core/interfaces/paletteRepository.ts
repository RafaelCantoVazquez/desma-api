import {
  PaletteRequestBody,
  PaletteRequestParams,
  PaletteResponse,
} from '../dtos/palette.dto';

export type GetPalette = (
  params: PaletteRequestParams
) => Promise<PaletteResponse>;
export type CreatePalette = (
  body: PaletteRequestBody
) => Promise<PaletteResponse>;
export type UpdatePalette = (
  params: PaletteRequestParams,
  body: PaletteRequestBody
) => Promise<PaletteResponse>;
export type DeletePalette = (
  params: PaletteRequestParams
) => Promise<PaletteResponse>;
