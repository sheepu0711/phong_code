import User from '../models/User.js';
import Recipe from '../models/Recipe.js';

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();

    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user favorites
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add recipe to favorites
export const addFavorite = async (req, res) => {
  try {
    const recipeId = req.body.recipeId;
    const user = await User.findById(req.user._id);

    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }

    res.json({ message: 'Recipe added to favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove recipe from favorites
export const removeFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(id => id.toString() !== recipeId);
    await user.save();

    res.json({ message: 'Recipe removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user bookmarks
export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarks');
    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add recipe to bookmarks
export const addBookmark = async (req, res) => {
  try {
    const recipeId = req.body.recipeId;
    const user = await User.findById(req.user._id);

    if (!user.bookmarks.includes(recipeId)) {
      user.bookmarks.push(recipeId);
      await user.save();
    }

    res.json({ message: 'Recipe added to bookmarks' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove recipe from bookmarks
export const removeBookmark = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const user = await User.findById(req.user._id);

    user.bookmarks = user.bookmarks.filter(id => id.toString() !== recipeId);
    await user.save();

    res.json({ message: 'Recipe removed from bookmarks' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
