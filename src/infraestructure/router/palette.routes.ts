import express, { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import {
  createPalette,
  getPalette,
  updatePalette,
  deletePalette,
} from '../controllers/palette.controller';

const router: Router = express.Router();

router.route('/').post(
  protect,
  validateRequest([
    { param_key: 'primaryColors', required: true, type: 'object' },
    { param_key: 'secondaryColors', required: true, type: 'object' },
    { param_key: 'textColors', required: true, type: 'object' },
    { param_key: 'backgroundColors', required: true, type: 'object' },
    { param_key: 'extraColors', required: true, type: 'object' },
  ]),
  createPalette
);
router
  .route('/:id')
  .get(protect, getPalette)
  .put(
    protect,
    validateRequest([
      { param_key: 'primaryColors', required: false, type: 'object' },
      { param_key: 'secondaryColors', required: false, type: 'object' },
      { param_key: 'textColors', required: false, type: 'object' },
      { param_key: 'backgroundColors', required: false, type: 'object' },
      { param_key: 'extraColors', required: false, type: 'object' },
    ]),
    updatePalette
  )
  .delete(protect, deletePalette);

export { router as paletteRoutes };
