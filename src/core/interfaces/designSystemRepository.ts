import {
  DesignSystemRequestBody,
  DesignSystemRequestParams,
  DesignSystemResponse,
} from '../dtos/designSystem.dto';

export type GetUserDesignSystems = (
  params: DesignSystemRequestParams
) => Promise<DesignSystemResponse>;
export type GetDesignSystemById = (
  params: DesignSystemRequestParams
) => Promise<DesignSystemResponse>;
export type CreateDesignSystem = (
  body: DesignSystemRequestBody
) => Promise<DesignSystemResponse>;
export type UpdateDesignSystem = (
  params: DesignSystemRequestParams,
  body: DesignSystemRequestBody
) => Promise<DesignSystemResponse>;
export type DeleteDesignSystem = (
  params: DesignSystemRequestParams
) => Promise<DesignSystemResponse>;
