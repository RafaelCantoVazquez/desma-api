import mongoose from 'mongoose';
import {
  CreateFonts,
  DeleteFonts,
  GetFonts,
  UpdateFonts,
} from '../../core/interfaces/fontsRepository';
import { HttpError } from '../errors/httpError';
import { Fonts } from '../models/fonts.model';

export const getFontsService: GetFonts = async (params) => {
  try {
    const { id } = params;
    const fonts = await Fonts.findById(id);

    if (!fonts) {
      throw new HttpError('Fonts not found', 404);
    }

    return {
      data: fonts,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError('Invalid fonts id syntax', 400);
    }
    throw new Error('An error has occurred while retrieving fonts');
  }
};

export const createFontsService: CreateFonts = async (body) => {
  try {
    const { headingFontName, parragraphFontName, baseSize, scaleFactor } = body;

    const fonts = await Fonts.create({
      headingFontName: headingFontName,
      parragraphFontName: parragraphFontName,
      baseSize: baseSize,
      scaleFactor: scaleFactor,
    });

    if (!fonts) {
      throw new HttpError('Invalid fonts data', 400);
    }

    return {
      message: 'Fonts created successfully',
      data: fonts,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while creating fonts');
  }
};

export const updateFontsService: UpdateFonts = async (params, body) => {
  try {
    const { id } = params;
    const { headingFontName, parragraphFontName, baseSize, scaleFactor } = body;

    const updatedFonts = await Fonts.findByIdAndUpdate(
      id,
      {
        headingFontName: headingFontName,
        parragraphFontName: parragraphFontName,
        baseSize: baseSize,
        scaleFactor: scaleFactor,
      },
      { new: true }
    );

    if (!updatedFonts) {
      throw new HttpError('Fonts not found', 404);
    }

    return {
      message: 'Fonts updated successfully',
      data: updatedFonts,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError('Invalid fonts id or fields syntax', 400);
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while updating fonts');
  }
};

export const deleteFontsService: DeleteFonts = async (params) => {
  try {
    const { id } = params;

    const deletedFonts = await Fonts.deleteOne({ _id: id });

    if (deletedFonts.deletedCount < 1) {
      throw new HttpError('Fonts not found', 404);
    }

    return {
      message: 'Fonts deleted successfully',
      data: deletedFonts,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError('Invalid fonts id syntax or fonts not found', 400);
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while deleting fonts');
  }
};
