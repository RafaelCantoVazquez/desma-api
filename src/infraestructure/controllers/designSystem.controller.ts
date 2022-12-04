import { NextFunction, Request, Response } from 'express';
import { designSystemService } from '../../core/useCases/designSystem';
import { HttpError } from '../errors/httpError';
import {
  createDesignSystemService,
  deleteDesignSystemService,
  getUserDesignSystemsService,
  getDesignSystemByIdService,
  updateDesignSystemService,
} from '../services/designSystem.service';

export const getUserDesignSystems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const getUserDesignSystems = designSystemService.makeGetUserDesignSystems(
    getUserDesignSystemsService
  );

  try {
    const data = await getUserDesignSystems({ id });
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const getDesignSystemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const getDesignSystemById = designSystemService.makeGetDesignSystemById(
    getDesignSystemByIdService
  );

  try {
    const data = await getDesignSystemById({ id });
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const createDesignSystem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const createDesignSystem = designSystemService.makeCreateDesignSystem(
    createDesignSystemService
  );

  try {
    const data = await createDesignSystem(body);
    res.status(201).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const updateDesignSystem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const body = req.body;
  const updateDesignSystem = designSystemService.makeUpdateDesignSystem(
    updateDesignSystemService
  );

  try {
    const data = await updateDesignSystem({ id }, body);
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const deleteDesignSystem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const deleteDesignSystem = designSystemService.makeDeleteDesignSystem(
    deleteDesignSystemService
  );

  try {
    const data = await deleteDesignSystem({ id });
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};
