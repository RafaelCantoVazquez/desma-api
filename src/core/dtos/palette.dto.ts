import { Color } from './color.dto';

export interface Palette {
  primaryColors: string[] | Color[];
  secondaryColors: string[] | Color[];
  textColors: string[] | Color[];
  backgroundColors: string[] | Color[];
  extraColors: string[] | Color[];
}

export interface PaletteResponse {
  acknowledged?: boolean;
  modifiedCount?: number;
  upsertedId?: string | null;
  upsertedCount?: number;
  matchedCount?: number;
  message?: string;
  data?:
    | (Palette & {
        _id: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      })
    | {
        deletedCount: number;
      };
}

export interface PaletteRequestParams {
  id: string;
}

export type PaletteRequestBody = {
  primaryColors: Color[];
  secondaryColors: Color[];
  textColors: Color[];
  backgroundColors: Color[];
  extraColors: Color[];
};
