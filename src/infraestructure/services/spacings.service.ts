import mongoose from 'mongoose';
import {
  CreateSpacings,
  DeleteSpacings,
  GetSpacings,
  UpdateSpacings,
} from '../../core/interfaces/spacingsRepository';
import { HttpError } from '../errors/httpError';
import { Spacings } from '../models/spacings.model';

export const getSpacingsService: GetSpacings = async (params) => {
  try {
    const { id } = params;
    const spacings = await Spacings.findById(id);

    if (!spacings) {
      throw new HttpError('Spacings not found', 404);
    }

    return {
      data: spacings,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError('Invalid spacings id syntax', 400);
    }
    throw new Error('An error has occurred while retrieving spacings');
  }
};

export const createSpacingsService: CreateSpacings = async (body) => {
  try {
    const { baseSize, scaleFactor } = body;

    const spacings = await Spacings.create({
      baseSize: baseSize,
      scaleFactor: scaleFactor,
    });

    if (!spacings) {
      throw new HttpError('Invalid spacings data', 400);
    }

    return {
      message: 'Spacings created successfully',
      data: spacings,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while creating spacings');
  }
};

export const updateSpacingsService: UpdateSpacings = async (params, body) => {
  try {
    const { id } = params;
    const { baseSize, scaleFactor } = body;

    const updatedSpacings = await Spacings.findByIdAndUpdate(
      id,
      {
        baseSize: baseSize,
        scaleFactor: scaleFactor,
      },
      { new: true }
    );

    if (!updatedSpacings) {
      throw new HttpError('Spacings not found', 404);
    }

    return {
      message: 'Spacings updated successfully',
      data: updatedSpacings,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError('Invalid spacings id or fields syntax', 400);
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while updating spacings');
  }
};

export const deleteSpacingsService: DeleteSpacings = async (params) => {
  try {
    const { id } = params;

    const deletedSpacings = await Spacings.deleteOne({ _id: id });

    if (deletedSpacings.deletedCount < 1) {
      throw new HttpError('Spacings not found', 404);
    }

    return {
      message: 'Spacings deleted successfully',
      data: deletedSpacings,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError(
        'Invalid spacings id syntax or spacings not found',
        400
      );
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while deleting spacings');
  }
};
