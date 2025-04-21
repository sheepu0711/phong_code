const express = require('express');
const router = express.Router();

// Import individual route files
const userRoutes = require('./userRoute');
const recipeRoutes = require('./recipeRoutes');
const reviewRoutes = require('./commentRoute');

// Use individual routers for different endpoints
router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
