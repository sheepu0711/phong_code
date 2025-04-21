import express from 'express';
import { getRecipes, getRecipeById, createRecipe } from '../controllers/recipeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getRecipes);
router.post('/', protect, createRecipe);
router.get('/:id', getRecipeById);

export default router;
