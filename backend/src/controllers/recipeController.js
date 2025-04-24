import Comment from '../models/commentModel.js';
import Recipe from '../models/recipeModel.js';
import User from '../models/userModel.js';

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
export const getRecipes = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.page) || 1;

    const userId = req.query.userId;

    const keyword = req.query.keyword
      ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: 'i' } },
          { description: { $regex: req.query.keyword, $options: 'i' } }
        ]
      }
      : {};

    const category = req.query.category
      ? { category: req.query.category }
      : {};

    const cuisine = req.query.cuisine
      ? { cuisine: req.query.cuisine }
      : {};

    const tags = req.query.tags
      ? { tags: { $in: req.query.tags.split(',') } }
      : {};

    const count = await Recipe.countDocuments({
      ...keyword,
      ...category,
      ...cuisine,
      ...tags,
      isPublic: true
    });

    const recipes = await Recipe.find({
      ...keyword,
      ...category,
      ...cuisine,
      ...tags,
      isPublic: true
    })
      .populate('createdBy', 'username avatar')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      recipes,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('createdBy', 'username avatar location');

    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Private
export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      steps,
      prepTime,
      cookTime,
      servings,
      difficulty,
      cuisine,
      category,
      tags,
      mainImage,
      nutrition,
      notes,
      isPublic
    } = req.body;

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      prepTime,
      cookTime,
      servings,
      difficulty,
      cuisine,
      category,
      tags,
      mainImage,
      nutrition,
      notes,
      isPublic,
      createdBy: req.user._id
    });

    const createdRecipe = await recipe.save();

    res.status(201).json(createdRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a recipe
// @route   PUT /api/recipes/:id
// @access  Private
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user is recipe owner
    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this recipe' });
    }

    const {
      title,
      description,
      ingredients,
      steps,
      prepTime,
      cookTime,
      servings,
      difficulty,
      cuisine,
      category,
      tags,
      mainImage,
      nutrition,
      notes,
      isPublic
    } = req.body;

    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.steps = steps || recipe.steps;
    recipe.prepTime = prepTime || recipe.prepTime;
    recipe.cookTime = cookTime || recipe.cookTime;
    recipe.servings = servings || recipe.servings;
    recipe.difficulty = difficulty || recipe.difficulty;
    recipe.cuisine = cuisine || recipe.cuisine;
    recipe.category = category || recipe.category;
    recipe.tags = tags || recipe.tags;
    recipe.mainImage = mainImage || recipe.mainImage;
    recipe.nutrition = nutrition || recipe.nutrition;
    recipe.notes = notes || recipe.notes;
    recipe.isPublic = isPublic !== undefined ? isPublic : recipe.isPublic;

    const updatedRecipe = await recipe.save();

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
// @access  Private
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user is recipe owner
    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this recipe' });
    }

    // Delete related comments
    await Comment.deleteMany({ recipe: req.params.id });

    // Remove from user favorites and bookmarks
    await User.updateMany(
      {
        $or: [
          { favorites: req.params.id },
          { bookmarks: req.params.id }
        ]
      },
      {
        $pull: {
          favorites: req.params.id,
          bookmarks: req.params.id
        }
      }
    );

    await recipe.deleteOne();

    res.json({ message: 'Recipe removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get related recipes
// @route   GET /api/recipes/:id/related
// @access  Public
export const getRelatedRecipes = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Find recipes with similar tags or category
    const relatedRecipes = await Recipe.find({
      _id: { $ne: req.params.id },
      isPublic: true,
      $or: [
        { tags: { $in: recipe.tags } },
        { category: recipe.category },
        { cuisine: recipe.cuisine }
      ]
    })
      .populate('createdBy', 'username')
      .limit(3);

    res.json(relatedRecipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get popular recipes
// @route   GET /api/recipes/popular
// @access  Public
export const getPopularRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ isPublic: true })
      .sort({ rating: -1, reviewCount: -1 })
      .populate('createdBy', 'username avatar')
      .limit(4);

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recent recipes
// @route   GET /api/recipes/recent
// @access  Public
export const getRecentRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'username avatar')
      .limit(4);

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
