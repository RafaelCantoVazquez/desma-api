import express, { Router } from 'express';
import {
  getUserDesignSystems,
  getDesignSystemById,
  createDesignSystem,
  updateDesignSystem,
  deleteDesignSystem,
} from '../controllers/designSystem.controller';
import { protect } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router
  .route('/:id')
  .get(protect, getDesignSystemById)
  .put(protect, updateDesignSystem)
  .delete(protect, deleteDesignSystem);
router.get('/users/:id', protect, getUserDesignSystems);
router.post('/', protect, createDesignSystem);

export { router as designSystemRoutes };
