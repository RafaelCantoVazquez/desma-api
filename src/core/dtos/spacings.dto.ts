export interface Spacings {
  baseSize: number;
  scaleFactor: string;
}

export interface SpacingsResponse {
  message?: string;
  data:
    | (Spacings & {
        _id: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      })
    | {
        deletedCount: number;
      };
}

export interface SpacingsRequestParams {
  id: string;
}

export type SpacingsRequestBody = Spacings;
