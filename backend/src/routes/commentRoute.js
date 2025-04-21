import express from 'express';
import { getPopularSearches, getCategories } from '../controllers/searchController.js';

const router = express.Router();

router.get('/popular-queries', getPopularSearches);
router.get('/categories', getCategories);

export default router;
