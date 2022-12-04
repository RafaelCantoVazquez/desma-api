import mongoose from 'mongoose';
import {
  CreatePalette,
  DeletePalette,
  GetPalette,
  UpdatePalette,
} from '../../core/interfaces/paletteRepository';
import { HttpError } from '../errors/httpError';
import { Palette } from '../models/palette.model';
import {
  bulkUpdateColors,
  deleteManyColors,
  insertManyColors,
} from '../utils/colorFunctions';

interface Color {
  _id?: string;
  hexCode: string;
  type?: string;
}

export const getPaletteService: GetPalette = async (params) => {
  try {
    const { id: paletteId } = params;
    const palette = await Palette.findOne(
      { _id: paletteId },
      { createdAt: false, updatedAt: false, __v: false }
    )
      .populate([
        { path: 'primaryColors', select: '_id hexCode' },
        { path: 'secondaryColors', select: '_id hexCode' },
        { path: 'textColors', select: '_id hexCode' },
        { path: 'backgroundColors', select: '_id hexCode' },
        { path: 'extraColors', select: '_id hexCode' },
      ])
      .then((palette) => {
        if (!palette) throw new HttpError('No palette found', 404);
        return { ...palette._doc };
      });

    return palette;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError('Invalid palette id syntax', 400);
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while retrieving palette');
  }
};

export const createPaletteService: CreatePalette = async (body) => {
  try {
    const request: Record<string, Color[]> = body;
    const individualColors = [];

    for (let field in request) {
      for (let color in request[field]) {
        individualColors.push({
          type: field,
          hexCode: request[field][color].hexCode,
        });
      }
    }

    const colorsInserted = await insertManyColors(individualColors);

    const paletteInsert: Record<string, Color[]> = {};
    let type: string = '';
    for (let color in colorsInserted) {
      type = colorsInserted[color].type;
      paletteInsert[type]
        ? paletteInsert[type].push(colorsInserted[color]._id)
        : (paletteInsert[type] = [colorsInserted[color]._id]);
    }

    const paletteData = await Palette.create(paletteInsert);

    return paletteData;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError('Invalid palette id syntax', 400);
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while creating palette');
  }
};

export const updatePaletteService: UpdatePalette = async (params, body) => {
  try {
    const { id: paletteId } = params;
    const request: Record<string, Color[]> = body;
    const colorOpts = [];
    const paletteUpdate: Record<string, any> = {};
    let colorId: string | object;

    delete request._id;
    const palette = await Palette.findOne(
      { _id: paletteId },
      { _id: false, createdAt: false, updatedAt: false, __v: false }
    );

    if (!palette) throw new HttpError(`No palette with id: ${paletteId}`, 404);

    for (let field in request) {
      for (let color in request[field]) {
        colorId = request[field][color]._id || new mongoose.Types.ObjectId();
        colorOpts.push({
          updateOne: {
            filter: { _id: colorId },
            update: {
              $set: {
                type: field,
                hexCode: request[field][color].hexCode,
              },
            },
            upsert: true,
          },
        });
        colorOpts.push({
          updateOne: {
            filter: { _id: paletteId },
            update: {
              $pullAll: {},
            },
          },
        });
        paletteUpdate[field]
          ? paletteUpdate[field].push(colorId)
          : (paletteUpdate[field] = [colorId]);
      }
    }

    Object.keys(palette._doc).map((field) => {
      !paletteUpdate[field] && (paletteUpdate[field] = []);
      palette._doc[field] = palette._doc[field].map((color: any) =>
        color.toString()
      );
    });

    await bulkUpdateColors(colorOpts);
    const updatedPalette = await Palette.updateOne(
      { _id: paletteId },
      paletteUpdate
    );

    return {
      acknowledged: updatedPalette.acknowledged,
      modifiedCount: updatedPalette.modifiedCount,
      upsertedId: updatedPalette.upsertedId
        ? updatedPalette.upsertedId.toString()
        : null,
      upsertedCount: updatedPalette.upsertedCount,
      matchedCount: updatedPalette.matchedCount,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError('Invalid palette id or fields syntax', 400);
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while updating palette');
  }
};

export const deletePaletteService: DeletePalette = async (params) => {
  try {
    const { id: paletteId } = params;
    let message: string | object;

    let palette = await Palette.findOne(
      { _id: paletteId },
      {
        _id: true,
        primaryColors: true,
        secondaryColors: true,
        textColors: true,
        backgroundColors: true,
        extraColors: true,
      }
    );

    if (!palette) throw new HttpError(`No palette with id: ${paletteId}`, 404);

    const paletteData = palette._doc;
    let ids = [];

    await palette.remove();
    for (let field in paletteData) {
      if (paletteData[field].length) ids.push(paletteData[field]);
    }
    message = `Palette with id : ${paletteId} successfully removed`;
    await deleteManyColors(ids.flat());

    return { message };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError(
        'Invalid palette id syntax or palette not found',
        400
      );
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while deleting palette');
  }
};
