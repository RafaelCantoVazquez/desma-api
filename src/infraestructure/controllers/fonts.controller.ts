import { NextFunction, Request, Response } from 'express';
import { fontsService } from '../../core/useCases/fonts';
import { HttpError } from '../errors/httpError';
import { createFontsService, deleteFontsService, getFontsService, updateFontsService } from '../services/fonts.service';

export const getFonts = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const getFonts = fontsService.makeGetFonts(getFontsService);

  try {
    const data = await getFonts({id});
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const createFonts = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const createFonts = fontsService.makeCreateFonts(createFontsService);

  try {
    const data = await createFonts(body);
    res.status(201).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const updateFonts = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const body = req.body;
  const updateFonts = fontsService.makeUpdateFonts(updateFontsService);

  try {
    const data = await updateFonts({id}, body);
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const deleteFonts = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const deleteFonts = fontsService.makeDeleteFonts(deleteFontsService);

  try {
    const data = await deleteFonts({id});
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};