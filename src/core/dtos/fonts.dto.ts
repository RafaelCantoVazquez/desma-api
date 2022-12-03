export interface Fonts {
  headingFontName: string,
  parragraphFontName: string,
  baseSize: number,
  scaleFactor: string
}

export interface FontsResponse {
  message?: string,
  data: (Fonts & {
    _id: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
  }) | {
    deletedCount: number,
  },
}

export interface FontsRequestParams {
  id: string,
};

export type FontsRequestBody = Fonts;