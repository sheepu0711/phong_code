import {
  Box,
  Button,
  Center,
  Group,
  Loader,
  SimpleGrid,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconBookmark,
  IconChefHat,
  IconHeart,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api/api";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";

import { useAuth } from "../contexts/AuthContext";

function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("saved");
  const { isAuthenticated, userInfo } = useAuth();

  // Fetch recipes function
  const fetchRecipes = async (type = "saved") => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = "/recipes";
      let params = {};

      // Determine endpoint and params based on tab type
      if (type === "recipes" && userInfo?.id) {
        endpoint = "/recipes";
        params = { userId: userInfo.id };
      } else if (type === "favorites") {
        endpoint = "/users/favorites";
      } else {
        endpoint = "/users/bookmarks";
      }

      const response = await apiRequest("get", endpoint, params);
      if (response) {
        setRecipes(response.recipes || []);
      }
    } catch (error) {
      console.error("Error loading recipes:", error);
      setError("Unable to load recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value === "recipes") {
      fetchRecipes("recipes");
    } else if (value === "favorites") {
      fetchRecipes("favorites");
    } else {
      fetchRecipes("saved");
    }
  };

  // Only fetch recipes on mount if on saved tab
  useEffect(() => {
    if (activeTab === "saved") {
      fetchRecipes("saved");
    }
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRecipeList = () => {
    if (loading) {
      return (
        <Center py={50}>
          <Loader size="lg" color="orange" />
        </Center>
      );
    }

    if (error) {
      return (
        <Center py={50}>
          <Text c="red" ta="center">
            {error}
          </Text>
        </Center>
      );
    }

    if (filteredRecipes.length === 0) {
      return (
        <Box ta="center" py={50}>
          <IconBookmark
            size={48}
            color="gray"
            style={{ opacity: 0.5, marginBottom: 20 }}
          />
          <Title order={3} mb="sm">
            No recipes found
          </Title>
          <Text c="dimmed" mb="xl">
            {searchQuery
              ? "Try searching with different keywords"
              : "You haven't saved any recipes yet"}
          </Text>
          <Button
            leftSection={<IconPlus size={14} />}
            variant="outline"
            to="/search"
            component={Link}
          >
            Find recipes
          </Button>
        </Box>
      );
    }

    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {filteredRecipes.map((item) => (
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
    );
  };

  return (
    <Box>
      <Header />
      <Box p="xl">
        <Group position="apart" mb="lg">
          <Title order={1}>Recipes</Title>
          <Button
            leftSection={<IconPlus size={18} />}
            color="orange"
            component={Link}
            to="/create-recipe"
          >
            Create Recipe
          </Button>
        </Group>

        <Tabs value={activeTab} onChange={handleTabChange} mb="xl">
          <Tabs.List>
            <Tabs.Tab value="saved" leftSection={<IconBookmark size={16} />}>
              Saved Recipes
            </Tabs.Tab>
            <Tabs.Tab value="favorites" leftSection={<IconHeart size={16} />}>
              Favorites
            </Tabs.Tab>
            <Tabs.Tab value="recipes" leftSection={<IconChefHat size={16} />}>
              My Recipes
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="saved" pt="md">
            <TextInput
              placeholder="Search saved recipes"
              leftSection={<IconSearch size={16} />}
              mb="lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {renderRecipeList()}
          </Tabs.Panel>

          <Tabs.Panel value="favorites" pt="md">
            {renderRecipeList()}
          </Tabs.Panel>

          <Tabs.Panel value="recipes" pt="md">
            {renderRecipeList()}
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Box>
  );
}

export default RecipePage;
