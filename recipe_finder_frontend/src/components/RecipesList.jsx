import { Box, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import RecipeCard from "./RecipeCard";

function RecipesList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await apiRequest("get", "/recipes");
    if (response) {
      setRecipes(response.recipes);
    }
  };

  return (
    <Box mt={30}>
      <Text fw={600} size="lg" mb={10}>
        See what's cooking! Exploring New Recipes
      </Text>
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }} spacing="md">
        {recipes.map((item, index) => (
          <RecipeCard
            key={item._id}
            id={item._id}
            image={item.mainImage}
            title={item.title}
            author={item.author}
            rating={item.rating}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default RecipesList;
