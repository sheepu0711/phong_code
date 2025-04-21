import express from 'express';
import {
  getProfile,
  updateProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
  getBookmarks,
  addBookmark,
  removeBookmark
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

router.get('/favorites', protect, getFavorites);
router.post('/favorites', protect, addFavorite);
router.delete('/favorites/:recipeId', protect, removeFavorite);

router.get('/bookmarks', protect, getBookmarks);
router.post('/bookmarks', protect, addBookmark);
router.delete('/bookmarks/:recipeId', protect, removeBookmark);

export default router;
