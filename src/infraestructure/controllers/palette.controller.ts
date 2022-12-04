import { NextFunction, Request, Response } from 'express';
import { paletteService } from '../../core/useCases/palette';
import { HttpError } from '../errors/httpError';
import {
  createPaletteService,
  deletePaletteService,
  getPaletteService,
  updatePaletteService,
} from '../services/palette.service';

export const getPalette = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const getPalette = paletteService.makeGetPalette(getPaletteService);

  try {
    const data = await getPalette({ id });
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const createPalette = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const createPalette = paletteService.makeCreatePalette(createPaletteService);

  try {
    const data = await createPalette(body);
    res.status(201).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const updatePalette = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const body = req.body;
  const updatePalette = paletteService.makeUpdatePalette(updatePaletteService);

  try {
    const data = await updatePalette({ id }, body);
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const deletePalette = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const deletePalette = paletteService.makeDeletePalette(deletePaletteService);

  try {
    const data = await deletePalette({ id });
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};
