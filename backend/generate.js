import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

// Import models
import User from './src/models/userModel.js';
import Recipe from './src/models/recipeModel.js';
import Comment from './src/models/commentModel.js';
import Category from './src/models/categoryModel.js';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log('MongoDB connected for database seeding');
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

// Create directory for seed data
const ensureDirExists = () => {
  const uploadDir = 'uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  return uploadDir;
};

// Sample recipe images
const recipeImages = [
  'https://img-global.cpcdn.com/recipes/5445850674561024/400x400cq70/photo.jpg',
  'https://img-global.cpcdn.com/recipes/cadc6c8abff9f4d9/400x400cq70/photo.jpg',
  'https://img-global.cpcdn.com/recipes/6059095305625600/400x400cq70/photo.jpg',
  'https://img-global.cpcdn.com/recipes/5831b2b56efd5594/400x400cq70/photo.jpg',
  'https://img-global.cpcdn.com/recipes/036400bf6e807ce6/160x120cq50/photo.webp',
  'https://img-global.cpcdn.com/recipes/953f1d23c28a5dea/160x120cq50/photo.webp',
  'https://img-global.cpcdn.com/recipes/812e3b5063299b1d/160x120cq50/photo.webp',
  'https://img-global.cpcdn.com/recipes/0fe8ee571c80fd2b/160x120cq50/photo.webp',
];

// Categories with descriptions
const categoryData = [
  { 
    name: 'Breakfast', 
    description: 'Start your day right with these breakfast recipes',
    image: 'https://img-global.cpcdn.com/recipes/cadc6c8abff9f4d9/400x400cq70/photo.jpg'
  },
  { 
    name: 'Lunch', 
    description: 'Perfect midday meal options',
    image: 'https://img-global.cpcdn.com/recipes/5445850674561024/400x400cq70/photo.jpg'
  },
  { 
    name: 'Dinner', 
    description: 'Satisfying evening meals for the whole family',
    image: 'https://img-global.cpcdn.com/recipes/6059095305625600/400x400cq70/photo.jpg'
  },
  { 
    name: 'Dessert', 
    description: 'Sweet treats to end any meal',
    image: 'https://img-global.cpcdn.com/recipes/5831b2b56efd5594/400x400cq70/photo.jpg'
  },
  { 
    name: 'Snack', 
    description: 'Quick bites for any time of day',
    image: 'https://img-global.cpcdn.com/recipes/036400bf6e807ce6/160x120cq50/photo.webp'
  },
  { 
    name: 'Vegetarian', 
    description: 'Meat-free meals full of flavor',
    image: 'https://img-global.cpcdn.com/recipes/953f1d23c28a5dea/160x120cq50/photo.webp'
  },
  { 
    name: 'Vegan', 
    description: 'Plant-based recipes with no animal products',
    image: 'https://img-global.cpcdn.com/recipes/812e3b5063299b1d/160x120cq50/photo.webp'
  },
  { 
    name: 'Gluten-Free', 
    description: 'Delicious recipes without gluten',
    image: 'https://img-global.cpcdn.com/recipes/0fe8ee571c80fd2b/160x120cq50/photo.webp'
  }
];

// Cuisines
const cuisines = [
  'Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 
  'French', 'Thai', 'Mediterranean', 'American', 'Korean', 
  'Vietnamese', 'Greek', 'Spanish', 'Middle Eastern', 'Brazilian'
];

// Tags
const tags = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb',
  'Keto', 'Paleo', 'High-Protein', 'Low-Fat', 'Quick',
  'Budget', 'Kid-Friendly', 'Dessert', 'Breakfast', 'Lunch',
  'Dinner', 'Snack', 'Appetizer', 'Side Dish', 'Main Course',
  'Soup', 'Salad', 'Pasta', 'Rice', 'Noodles',
  'Baking', 'Grilling', 'Slow Cooker', 'One Pot', 'Healthy'
];

// Common ingredients
const ingredients = [
  'chicken breast', 'ground beef', 'salmon', 'tofu', 'eggs',
  'rice', 'pasta', 'bread', 'potatoes', 'sweet potatoes',
  'onion', 'garlic', 'tomatoes', 'bell peppers', 'carrots',
  'spinach', 'kale', 'broccoli', 'cauliflower', 'zucchini',
  'olive oil', 'vegetable oil', 'butter', 'milk', 'cheese',
  'yogurt', 'soy sauce', 'vinegar', 'lemon juice', 'honey',
  'maple syrup', 'salt', 'black pepper', 'paprika', 'cumin',
  'coriander', 'cinnamon', 'ginger', 'chili powder', 'basil',
  'parsley', 'cilantro', 'rosemary', 'thyme', 'oregano',
  'flour', 'sugar', 'brown sugar', 'baking powder', 'baking soda'
];

// Units for ingredients
const units = [
  'g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'oz', 'lb',
  'pinch', 'piece', ''
];

// Locations for users
const locations = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
  'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
  'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Jacksonville, FL',
  'San Francisco, CA', 'Indianapolis, IN', 'Columbus, OH', 'London, UK',
  'Toronto, Canada', 'Sydney, Australia', 'Tokyo, Japan', 'Paris, France'
];

// Seed the database with mock data
const seedDatabase = async () => {
  try {
    ensureDirExists();
    
    // Clean existing data
    await User.deleteMany();
    await Recipe.deleteMany();
    await Comment.deleteMany();
    await Category.deleteMany();
    
    console.log('Previous data cleaned');
    
    // Create categories
    const categories = await Category.insertMany(categoryData);
    console.log(`${categories.length} categories created`);
    
    // Create users
    const users = [];
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: adminPassword,
      location: 'San Francisco, CA',
      avatar: faker.image.avatar(),
      preferences: {
        emailNotifications: true,
        weeklyRecommendations: true,
        darkMode: false,
        metricUnits: true,
        publicProfile: true
      }
    });
    
    users.push(adminUser);
    
    // Create regular users
    for (let i = 0; i < 10; i++) {
      const userPassword = await bcrypt.hash('password123', 10);
      const user = await User.create({
        username: faker.internet.userName().toLowerCase().replace(/[^a-z0-9]/g, ''),
        email: faker.internet.email().toLowerCase(),
        password: userPassword,
        location: faker.helpers.arrayElement(locations),
        avatar: faker.image.avatar(),
        preferences: {
          emailNotifications: faker.datatype.boolean(),
          weeklyRecommendations: faker.datatype.boolean(),
          darkMode: faker.datatype.boolean(),
          metricUnits: faker.datatype.boolean(),
          publicProfile: faker.datatype.boolean()
        }
      });
      
      users.push(user);
    }
    
    console.log(`${users.length} users created`);
    
    // Create recipes
    const recipes = [];
    
    for (let i = 0; i < 30; i++) {
      const user = faker.helpers.arrayElement(users);
      const category = faker.helpers.arrayElement(categories);
      
      // Generate 3-8 random tags
      const recipeTags = faker.helpers.arrayElements(
        tags, 
        faker.number.int({ min: 3, max: 8 })
      );
      
      // Generate 5-12 random ingredients
      const recipeIngredients = [];
      const ingredientCount = faker.number.int({ min: 5, max: 12 });
      
      for (let j = 0; j < ingredientCount; j++) {
        recipeIngredients.push({
          name: faker.helpers.arrayElement(ingredients),
          amount: faker.number.float({ min: 0.25, max: 5, precision: 0.25 }).toString(),
          unit: faker.helpers.arrayElement(units)
        });
      }
      
      // Generate 3-8 cooking steps
      const recipeSteps = [];
      const stepCount = faker.number.int({ min: 3, max: 8 });
      
      for (let j = 0; j < stepCount; j++) {
        recipeSteps.push({
          description: faker.lorem.paragraph(),
          image: faker.datatype.boolean(0.3) ? faker.helpers.arrayElement(recipeImages) : ''
        });
      }
      
      // Create recipe
      const recipe = await Recipe.create({
        title: faker.lorem.words({ min: 3, max: 6 }).charAt(0).toUpperCase() + faker.lorem.words({ min: 3, max: 6 }).slice(1),
        description: faker.lorem.paragraph(),
        ingredients: recipeIngredients,
        steps: recipeSteps,
        prepTime: faker.number.int({ min: 5, max: 30 }),
        cookTime: faker.number.int({ min: 10, max: 120 }),
        servings: faker.number.int({ min: 1, max: 8 }),
        difficulty: faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']),
        cuisine: faker.helpers.arrayElement(cuisines),
        category: category.name,
        tags: recipeTags,
        mainImage: faker.helpers.arrayElement(recipeImages),
        nutrition: {
          calories: faker.number.int({ min: 100, max: 800 }).toString(),
          protein: faker.number.int({ min: 1, max: 50 }).toString() + 'g',
          carbs: faker.number.int({ min: 1, max: 100 }).toString() + 'g',
          fat: faker.number.int({ min: 1, max: 40 }).toString() + 'g',
          sodium: faker.number.int({ min: 10, max: 1000 }).toString() + 'mg',
          fiber: faker.number.int({ min: 0, max: 15 }).toString() + 'g'
        },
        notes: faker.datatype.boolean(0.7) ? faker.lorem.paragraph() : '',
        isPublic: faker.datatype.boolean(0.9),
        createdBy: user._id
      });
      
      recipes.push(recipe);
    }
    
    console.log(`${recipes.length} recipes created`);
    
    // Add favorite and bookmarked recipes for users
    for (const user of users) {
      // Add 0-5 favorites
      const favCount = faker.number.int({ min: 0, max: 5 });
      const userFavorites = faker.helpers.arrayElements(recipes, favCount).map(r => r._id);
      
      // Add 0-8 bookmarks
      const bookmarkCount = faker.number.int({ min: 0, max: 8 });
      const userBookmarks = faker.helpers.arrayElements(recipes, bookmarkCount).map(r => r._id);
      
      user.favorites = userFavorites;
      user.bookmarks = userBookmarks;
      
      await user.save();
    }
    
    console.log('User favorites and bookmarks added');
    
    // Create comments and ratings
    const comments = [];
    
    for (const recipe of recipes) {
      // Generate 0-10 comments per recipe
      const commentCount = faker.number.int({ min: 0, max: 10 });
      
      for (let i = 0; i < commentCount; i++) {
        // Get random user (excluding recipe creator)
        const availableUsers = users.filter(u => !u._id.equals(recipe.createdBy));
        if (availableUsers.length === 0) continue;
        
        const user = faker.helpers.arrayElement(availableUsers);
        const rating = faker.number.int({ min: 1, max: 5 });
        
        const comment = await Comment.create({
          content: faker.lorem.paragraph(),
          rating,
          recipe: recipe._id,
          user: user._id
        });
        
        comments.push(comment);
      }
    }
    
    console.log(`${comments.length} comments created`);
    
    // Update recipe ratings
    for (const recipe of recipes) {
      const recipeComments = comments.filter(c => c.recipe.toString() === recipe._id.toString());
      
      if (recipeComments.length > 0) {
        const totalRating = recipeComments.reduce((sum, comment) => sum + comment.rating, 0);
        const averageRating = totalRating / recipeComments.length;
        
        recipe.rating = Number(averageRating.toFixed(1));
        recipe.reviewCount = recipeComments.length;
        
        await recipe.save();
      }
    }
    
    console.log('Recipe ratings updated');
    
    console.log('Database seeding completed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Execute the seeding process
connectDB().then(() => {
  console.log('Connected to MongoDB for seeding');
  seedDatabase();
});