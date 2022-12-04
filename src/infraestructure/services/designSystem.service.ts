import mongoose from 'mongoose';
import {
  CreateDesignSystem,
  DeleteDesignSystem,
  GetUserDesignSystems,
  GetDesignSystemById,
  UpdateDesignSystem,
} from '../../core/interfaces/designSystemRepository';
import { HttpError } from '../errors/httpError';
import { DesignSystem } from '../models/designSystem.model';
import { deleteFontsService } from './fonts.service';
import { deletePaletteService } from './palette.service';
import { deleteSpacingsService } from './spacings.service';

export const getUserDesignSystemsService: GetUserDesignSystems = async (
  params
) => {
  try {
    const { id: userId } = params;
    const designSystems = await DesignSystem.find({ userId });

    if (designSystems.length < 1) {
      throw new HttpError('Design systems not found', 404);
    }

    return { data: designSystems };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError('Invalid design system id syntax', 400);
    }
    throw new Error(
      'An error has occurred while retrieving user design systems'
    );
  }
};

export const getDesignSystemByIdService: GetDesignSystemById = async (
  params
) => {
  try {
    const { id } = params;
    const designSystem = await DesignSystem.findById(id);

    if (!designSystem) {
      throw new HttpError('Design system not found', 404);
    }

    return { data: designSystem };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError('Invalid design system id syntax', 400);
    }
    throw new Error('An error has occurred while retrieving design system');
  }
};

export const createDesignSystemService: CreateDesignSystem = async (body) => {
  try {
    const { userId, name, paletteId, fontsId, spacingsId } = body;

    const designSystem = await DesignSystem.create({
      userId: userId,
      name: name,
      paletteId: paletteId,
      fontsId: fontsId,
      spacingsId: spacingsId,
    });

    if (!designSystem) {
      throw new HttpError('Invalid design system data', 400);
    }

    return {
      message: 'Design system created successfully',
      data: designSystem,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while creating design system');
  }
};

export const updateDesignSystemService: UpdateDesignSystem = async (
  params,
  body
) => {
  try {
    const { id } = params;
    const { name } = body;

    const updatedDesignSystem = await DesignSystem.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      { new: true }
    );

    if (!updatedDesignSystem) {
      throw new HttpError('Design system not found', 404);
    }

    return {
      message: 'Design system updated successfully',
      data: updatedDesignSystem,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError('Invalid designSystem id or fields syntax', 400);
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while updating designSystem');
  }
};

export const deleteDesignSystemService: DeleteDesignSystem = async (params) => {
  try {
    const { id } = params;

    const designSystem = await DesignSystem.findById(id);
    if (designSystem) {
      await deletePaletteService({ id: designSystem.paletteId });
      await deleteFontsService({ id: designSystem.fontsId });
      await deleteSpacingsService({ id: designSystem.spacingsId });
    }

    const deletedDesignSystem = await DesignSystem.deleteOne({ _id: id });
    if (deletedDesignSystem.deletedCount < 1) {
      throw new HttpError('Design system not found', 404);
    }

    return {
      message: 'Design system deleted successfully',
      data: deletedDesignSystem,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new HttpError(
        'Invalid design system id syntax or design system not found',
        400
      );
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new HttpError(error.message, 400);
    }
    throw new Error('An error has occurred while deleting design system');
  }
};
