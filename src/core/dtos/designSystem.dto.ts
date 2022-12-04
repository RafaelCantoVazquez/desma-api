export interface DesignSystem {
  _id: string;
  userId?: string;
  name: string;
  paletteId: string;
  fontsId: string;
  spacingsId: string;
}

export interface DesignSystemResponse {
  message?: string;
  data:
    | (DesignSystem & {
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
      })
    | {
        deletedCount: number;
      }
    | DesignSystem[];
}

export interface DesignSystemRequestParams {
  id: string;
}

export type DesignSystemRequestBody = DesignSystem;
