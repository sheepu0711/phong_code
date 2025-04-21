import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Box, Title, Text, Tabs, Group, TextInput, Switch, Button, SimpleGrid, Image, Paper, Center, Divider } from '@mantine/core';
import { IconSearch, IconStar, IconUser, IconClock } from '@tabler/icons-react';
import Header from '../components/Header';

function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [activeTab, setActiveTab] = useState('latest');

  const [withIngredients, setWithIngredients] = useState('');
  const [withoutIngredients, setWithoutIngredients] = useState('');

  // Mock search results based on the query
  const mockSearchResults = queryParam ? [
    {
      id: 301,
      title: `${queryParam.charAt(0).toUpperCase() + queryParam.slice(1)} Salad with Avocado`,
      image: 'https://img-global.cpcdn.com/recipes/5445850674561024/400x400cq70/photo.jpg',
      author: 'CookingMaster',
      rating: 4.8,
      time: '25 mins',
      difficulty: 'Easy'
    },
    {
      id: 302,
      title: `Grilled ${queryParam.charAt(0).toUpperCase() + queryParam.slice(1)} with Lemon Herb Marinade`,
      image: 'https://img-global.cpcdn.com/recipes/cadc6c8abff9f4d9/400x400cq70/photo.jpg',
      author: 'ChefDelights',
      rating: 4.6,
      time: '45 mins',
      difficulty: 'Medium'
    },
    {
      id: 303,
      title: `Spicy ${queryParam.charAt(0).toUpperCase() + queryParam.slice(1)} Stir Fry`,
      image: 'https://img-global.cpcdn.com/recipes/6059095305625600/400x400cq70/photo.jpg',
      author: 'SpiceLover',
      rating: 4.9,
      time: '30 mins',
      difficulty: 'Medium'
    },
    {
      id: 304,
      title: `Classic ${queryParam.charAt(0).toUpperCase() + queryParam.slice(1)} Soup`,
      image: 'https://img-global.cpcdn.com/recipes/5831b2b56efd5594/400x400cq70/photo.jpg',
      author: 'SoupMaster',
      rating: 4.7,
      time: '50 mins',
      difficulty: 'Easy'
    }
  ] : [];

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would trigger a search API call
    // For now, we'll just update the URL to reflect the search
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('q', searchQuery);
    window.history.pushState({}, '', `${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <Box>
      <Header />
      <Box p="xl">
        <Box mb="xl">
          <form onSubmit={handleSearch}>
            <Group position="center" mb="md">
              <TextInput
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '50%' }}
                size="md"
                leftSection={<IconSearch size={20} />}
              />
              <Button type="submit" color="orange" size="md">
                Search
              </Button>
            </Group>
          </form>

          <Box p="xl" bg="rgba(255, 248, 225, 0.5)" style={{ borderRadius: '8px' }}>
            <Title order={3} mb="lg">Filters</Title>

            <Text fw={500} mb="xs">Show me recipes with:</Text>
            <TextInput
              placeholder="Type ingredients..."
              value={withIngredients}
              onChange={(e) => setWithIngredients(e.target.value)}
              mb="md"
              leftSection={<IconSearch size={16} />}
            />

            <Text fw={500} mb="xs">Show me recipes without:</Text>
            <TextInput
              placeholder="Type ingredients..."
              value={withoutIngredients}
              onChange={(e) => setWithoutIngredients(e.target.value)}
              mb="md"
              leftSection={<IconSearch size={16} />}
            />

          </Box>

          <Tabs value={activeTab} onTabChange={setActiveTab} mb="xl">
            <Group position="center">
              <Tabs.List>
                <Tabs.Tab value="latest">Latest</Tabs.Tab>
                <Tabs.Tab value="popular">Popular</Tabs.Tab>
              </Tabs.List>
            </Group>
          </Tabs>

          <Title order={2} mb="lg">
            {queryParam} recipes {mockSearchResults.length > 0 ? `(${mockSearchResults.length})` : '(0)'}
          </Title>

          {mockSearchResults.length > 0 ? (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing="lg">
              {mockSearchResults.map((recipe) => (
                <Paper key={recipe.id} shadow="sm" p="md" radius="md" withBorder>
                  <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Image
                      src={recipe.image}
                      height={200}
                      radius="md"
                      mb="md"
                      alt={recipe.title}
                    />
                    <Title order={4} mb="xs">{recipe.title}</Title>
                    <Group spacing="xs" mb="xs">
                      <IconUser size={16} />
                      <Text size="sm">{recipe.author}</Text>
                    </Group>
                    <Group spacing="xs" mb="xs">
                      <IconStar size={16} color="#FFD700" />
                      <Text size="sm">{recipe.rating}</Text>
                    </Group>
                    <Group spacing="xs">
                      <IconClock size={16} />
                      <Text size="sm">{recipe.time}</Text>
                      <Text size="sm">•</Text>
                      <Text size="sm">{recipe.difficulty}</Text>
                    </Group>
                  </Link>
                </Paper>
              ))}
            </SimpleGrid>
          ) : (
            <Box py={50} style={{ textAlign: 'center' }}>
              <Center mb={20}>
                <div style={{ width: '80px', height: '80px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#666' }}>
                    <path d="M12 6C8.5 6 8 9.5 8 11V14H16V11C16 9.5 15.5 6 12 6Z" />
                    <path d="M19 14C19 15.86 15.866 20 12 20C8.134 20 5 15.86 5 14C5 13.4696 5.21071 12.9609 5.58579 12.5858C5.96086 12.2107 6.46957 12 7 12H17C17.5304 12 18.0391 12.2107 18.4142 12.5858C18.7893 12.9609 19 13.4696 19 14Z" />
                  </svg>
                </div>
              </Center>
              <Title order={3} mb="sm">Can't find a recipe?</Title>
              <Text c="dimmed" mb="xl">
                Be the first and share your own. Join the fun and help<br />your fellow cooks!
              </Text>
              <Button color="gray" variant="outline">
                Add recipe
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SearchPage;