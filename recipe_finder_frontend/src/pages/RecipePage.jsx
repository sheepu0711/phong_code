import { Box, Title, Text, SimpleGrid, Button, Group, Tabs, TextInput } from '@mantine/core';
import { IconSearch, IconPlus, IconHeart, IconBookmark, IconChefHat } from '@tabler/icons-react';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function RecipePage() {
  const savedRecipes = [
    {
      id: 1,
      title: 'cucumber',
      image: 'https://img-global.cpcdn.com/recipes/036400bf6e807ce6/160x120cq50/photo.webp',
      author: 'CookingMaster',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'chicken thighs',
      image: 'https://img-global.cpcdn.com/recipes/953f1d23c28a5dea/160x120cq50/photo.webp',
      author: 'CookingMaster',
      rating: 4.8,
    },
    {
      id: 3,
      title: 'ramen',
      image: 'https://img-global.cpcdn.com/recipes/812e3b5063299b1d/160x120cq50/photo.webp',
      author: 'CookingMaster',
      rating: 4.8,
    },
    {
      id: 4,
      title: 'prawn',
      image: 'https://img-global.cpcdn.com/recipes/0fe8ee571c80fd2b/160x120cq50/photo.webp',
      author: 'CookingMaster',
      rating: 4.8,
    },
  ];

  return (
    <Box>
      <Header />
      <Box p="xl">
        <Group position="apart" mb="lg">
          <Title order={1}>Recipes</Title>
          <Button leftSection={<IconPlus size={18} />} color="orange" component={Link} to="/create-recipe">
            Create Reciepe
          </Button>
        </Group>

        <Tabs defaultValue="saved" mb="xl">
          <Tabs.List>
            <Tabs.Tab value="saved" leftSection={<IconBookmark size={16} />}>
              Saved Recipes
            </Tabs.Tab>
            <Tabs.Tab value="favorites" leftSection={<IconHeart size={16} />}>
              Favorites
            </Tabs.Tab>
            <Tabs.Tab value="my-recipes" leftSection={<IconChefHat size={16} />}>
              My Recipes
            </Tabs.Tab>
          </Tabs.List>
          
          <Tabs.Panel value="saved" pt="md">
            <TextInput
              placeholder="Search saved recipes"
              leftSection={<IconSearch size={16} />}
              mb="lg"
            />
            
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {savedRecipes.map((item) => (
                <RecipeCard key={item.id} id={item.id} image={item.image} title={item.title} author={item.author} rating={item.rating} />
              ))}
            </SimpleGrid>
          </Tabs.Panel>
          
          <Tabs.Panel value="favorites" pt="md">
            <Box ta="center" py={50}>
              <IconHeart size={48} color="gray" style={{ opacity: 0.5, marginBottom: 20 }} />
              <Title order={3} mb="sm">No favorite recipes yet</Title>
              <Text c="dimmed" mb="xl">Save your favorite recipes here for quick access</Text>
              <Button leftSection={<IconPlus size={14} />} variant="outline" to="/search" component={Link}>
                Browse Recipes
              </Button>
            </Box>
          </Tabs.Panel>
          
          <Tabs.Panel value="my-recipes" pt="md">
            <Box ta="center" py={50}>
              <IconChefHat size={48} color="gray" style={{ opacity: 0.5, marginBottom: 20 }} />
              <Title order={3} mb="sm">You haven't created any recipes</Title>
              <Text c="dimmed" mb="xl">Share your cooking expertise with the Cookpad community</Text>
              <Button leftSection={<IconPlus size={14} />} color="orange" to="/create-recipe" component={Link}>
                Create Recipe
              </Button>
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Box>
  );
}

export default RecipePage;