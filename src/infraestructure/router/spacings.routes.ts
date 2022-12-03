import express, { Router } from 'express';
import {
  getSpacings,
  createSpacings,
  updateSpacings,
  deleteSpacings,
} from '../controllers/spacings.controller';
import { protect } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router
  .route('/:id')
  .get(protect, getSpacings)
  .put(protect, updateSpacings)
  .delete(protect, deleteSpacings);
router.post('/', protect, createSpacings);

export { router as spacingsRoutes };
