import Recipe from '../models/Recipe.js';

// Get all recipes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new recipe
export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, category, image } = req.body;

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      category,
      image,
      createdBy: req.user._id
    });

    const createdRecipe = await recipe.save();
    res.status(201).json(createdRecipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
