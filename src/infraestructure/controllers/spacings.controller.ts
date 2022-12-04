import { NextFunction, Request, Response } from 'express';
import { spacingsService } from '../../core/useCases/spacings';
import { HttpError } from '../errors/httpError';
import {
  createSpacingsService,
  deleteSpacingsService,
  getSpacingsService,
  updateSpacingsService,
} from '../services/spacings.service';

export const getSpacings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const getSpacings = spacingsService.makeGetSpacings(getSpacingsService);

  try {
    const data = await getSpacings({ id });
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const createSpacings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const createSpacings = spacingsService.makeCreateSpacings(
    createSpacingsService
  );

  try {
    const data = await createSpacings(body);
    res.status(201).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const updateSpacings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const body = req.body;
  const updateSpacings = spacingsService.makeUpdateSpacings(
    updateSpacingsService
  );

  try {
    const data = await updateSpacings({ id }, body);
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const deleteSpacings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const deleteSpacings = spacingsService.makeDeleteSpacings(
    deleteSpacingsService
  );

  try {
    const data = await deleteSpacings({ id });
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};
