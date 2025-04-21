import express from 'express';
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRelatedRecipes,
  getPopularRecipes,
  getRecentRecipes
} from '../controllers/recipeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getRecipes);
router.post('/', protect, createRecipe);
router.get('/popular', getPopularRecipes);
router.get('/recent', getRecentRecipes);
router.get('/:id', getRecipeById);
router.put('/:id', protect, updateRecipe);
router.delete('/:id', protect, deleteRecipe);
router.get('/:id/related', getRelatedRecipes);

export default router;
