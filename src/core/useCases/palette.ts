import {
  PaletteRequestBody,
  PaletteRequestParams,
  PaletteResponse,
} from '../dtos/palette.dto';
import {
  CreatePalette,
  DeletePalette,
  GetPalette,
  UpdatePalette,
} from '../interfaces/paletteRepository';

export const paletteService = Object.freeze({
  makeGetPalette: (getPalette: GetPalette) => makeGetPalette(getPalette),
  makeCreatePalette: (createPalette: CreatePalette) =>
    makeCreatePalette(createPalette),
  makeUpdatePalette: (updatePalette: UpdatePalette) =>
    makeUpdatePalette(updatePalette),
  makeDeletePalette: (deletePalette: DeletePalette) =>
    makeDeletePalette(deletePalette),
});

const makeGetPalette =
  (getPalette: GetPalette) =>
  async (params: PaletteRequestParams): Promise<PaletteResponse> => {
    const palette = await getPalette(params);
    return palette;
  };

const makeCreatePalette =
  (createPalette: CreatePalette) =>
  async (body: PaletteRequestBody): Promise<PaletteResponse> => {
    const palette = await createPalette(body);
    return palette;
  };

const makeUpdatePalette =
  (updatePalette: UpdatePalette) =>
  async (
    params: PaletteRequestParams,
    body: PaletteRequestBody
  ): Promise<PaletteResponse> => {
    const palette = await updatePalette(params, body);
    return palette;
  };

const makeDeletePalette =
  (deletePalette: DeletePalette) =>
  async (params: PaletteRequestParams): Promise<PaletteResponse> => {
    const palette = await deletePalette(params);
    return palette;
  };
