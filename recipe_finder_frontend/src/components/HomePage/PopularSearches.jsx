import { Box, Group, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { apiRequest } from "../../api/api";
import RecipeCard from "../RecipeCard";

function PopularSearches() {
  const [recipesPopular, setRecipesPopular] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await apiRequest("get", "/recipes/popular");
    if (response) {
      setRecipesPopular(response.recipes);
    }
  };

  return (
    <Box mt={20}>
      {recipesPopular && recipesPopular.length > 0 && (
        <>
          <Group justify="space-between" mb={10}>
            <Text fw={600} size="lg">
              Today's popular searches
            </Text>
          </Group>
          <SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }} spacing="md">
            {recipesPopular.map((item) => (
              <RecipeCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                author={item.author}
                rating={item.rating}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
}

export default PopularSearches;
