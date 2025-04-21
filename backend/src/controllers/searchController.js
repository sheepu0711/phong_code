// This can be expanded later with real search logic.
// Right now we return mock popular searches and mock categories.

export const getPopularSearches = (req, res) => {
    try {
      const popular = ['Pasta', 'Chicken', 'Vegan', 'Salad', 'Soup'];
      res.json(popular);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const getCategories = (req, res) => {
    try {
      const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  