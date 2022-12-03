import { SpacingsRequestBody, SpacingsRequestParams, SpacingsResponse } from "../dtos/spacings.dto";
import { CreateSpacings, DeleteSpacings, GetSpacings, UpdateSpacings } from "../interfaces/spacingsRepository";


export const spacingsService = Object.freeze({
  makeGetSpacings: (getSpacings: GetSpacings) => makeGetSpacings(getSpacings),
  makeCreateSpacings: (createSpacings: CreateSpacings) => makeCreateSpacings(createSpacings),
  makeUpdateSpacings: (updateSpacings: UpdateSpacings) => makeUpdateSpacings(updateSpacings),
  makeDeleteSpacings: (deleteSpacings: DeleteSpacings) => makeDeleteSpacings(deleteSpacings),
});

const makeGetSpacings =
  (getSpacings: GetSpacings) =>
  async (params: SpacingsRequestParams): Promise<SpacingsResponse> => {
    const spacings = await getSpacings(params);
    return spacings;
  };

const makeCreateSpacings =
  (createSpacings: CreateSpacings) =>
  async (body: SpacingsRequestBody): Promise<SpacingsResponse> => {
    const spacings = await createSpacings(body);
    return spacings;
  };

const makeUpdateSpacings =
  (updateSpacings: UpdateSpacings) =>
  async (params: SpacingsRequestParams, body: SpacingsRequestBody): Promise<SpacingsResponse> => {
    const spacings = await updateSpacings(params, body);
    return spacings;
  };

const makeDeleteSpacings =
  (deleteSpacings: DeleteSpacings) =>
  async (params: SpacingsRequestParams): Promise<SpacingsResponse> => {
    const spacings = await deleteSpacings(params);
    return spacings;
  };
