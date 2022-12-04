import {
  DesignSystemRequestBody,
  DesignSystemRequestParams,
  DesignSystemResponse,
} from '../dtos/designSystem.dto';
import {
  CreateDesignSystem,
  DeleteDesignSystem,
  GetUserDesignSystems,
  GetDesignSystemById,
  UpdateDesignSystem,
} from '../interfaces/designSystemRepository';

export const designSystemService = Object.freeze({
  makeGetUserDesignSystems: (getUserDesignSystems: GetUserDesignSystems) =>
    makeGetUserDesignSystems(getUserDesignSystems),
  makeGetDesignSystemById: (getDesignSystemById: GetDesignSystemById) =>
    makeGetDesignSystemById(getDesignSystemById),
  makeCreateDesignSystem: (createDesignSystem: CreateDesignSystem) =>
    makeCreateDesignSystem(createDesignSystem),
  makeUpdateDesignSystem: (updateDesignSystem: UpdateDesignSystem) =>
    makeUpdateDesignSystem(updateDesignSystem),
  makeDeleteDesignSystem: (deleteDesignSystem: DeleteDesignSystem) =>
    makeDeleteDesignSystem(deleteDesignSystem),
});

const makeGetUserDesignSystems =
  (getUserDesignSystems: GetUserDesignSystems) =>
  async (params: DesignSystemRequestParams): Promise<DesignSystemResponse> => {
    const designSystems = await getUserDesignSystems(params);
    return designSystems;
  };

const makeGetDesignSystemById =
  (getDesignSystemById: GetDesignSystemById) =>
  async (params: DesignSystemRequestParams): Promise<DesignSystemResponse> => {
    const designSystem = await getDesignSystemById(params);
    return designSystem;
  };

const makeCreateDesignSystem =
  (createDesignSystem: CreateDesignSystem) =>
  async (body: DesignSystemRequestBody): Promise<DesignSystemResponse> => {
    const designSystem = await createDesignSystem(body);
    return designSystem;
  };

const makeUpdateDesignSystem =
  (updateDesignSystem: UpdateDesignSystem) =>
  async (
    params: DesignSystemRequestParams,
    body: DesignSystemRequestBody
  ): Promise<DesignSystemResponse> => {
    const designSystem = await updateDesignSystem(params, body);
    return designSystem;
  };

const makeDeleteDesignSystem =
  (deleteDesignSystem: DeleteDesignSystem) =>
  async (params: DesignSystemRequestParams): Promise<DesignSystemResponse> => {
    const designSystem = await deleteDesignSystem(params);
    return designSystem;
  };
