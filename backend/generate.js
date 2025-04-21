import mongoose from 'mongoose';
import dotenv from 'dotenv';
import faker from 'faker';

import User from './models/User.js';
import Recipe from './models/Recipe.js';
import Comment from './models/Comment.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const seedDB = async () => {
  await User.deleteMany();
  await Recipe.deleteMany();
  await Comment.deleteMany();

  const users = [];

  for (let i = 0; i < 5; i++) {
    const user = new User({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      favorites: [],
      bookmarks: []
    });
    await user.save();
    users.push(user);
  }

  const recipes = [];

  for (let i = 0; i < 10; i++) {
    const recipe = new Recipe({
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      ingredients: [faker.lorem.word(), faker.lorem.word()],
      steps: [faker.lorem.sentence(), faker.lorem.sentence()],
      category: faker.random.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack']),
      createdBy: faker.random.arrayElement(users)._id
    });
    await recipe.save();
    recipes.push(recipe);
  }

  // Assign favorites and bookmarks randomly
  for (let user of users) {
    user.favorites = faker.random.arrayElements(recipes.map(r => r._id), 2);
    user.bookmarks = faker.random.arrayElements(recipes.map(r => r._id), 3);
    await user.save();
  }

  // Create comments
  for (let i = 0; i < 20; i++) {
    const comment = new Comment({
      content: faker.lorem.sentence(),
      user: faker.random.arrayElement(users)._id,
      recipe: faker.random.arrayElement(recipes)._id
    });
    await comment.save();
  }

  console.log('Seeding done!');
  process.exit();
};

connectDB().then(seedDB);
