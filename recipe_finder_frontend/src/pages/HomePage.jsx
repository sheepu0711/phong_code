import { Box, Center, Image, Stack, Group, TextInput, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import Header from '../components/Header';
import PopularSearches from '../components/HomePage/PopularSearches';
import RecipesList from '../components/RecipesList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box>
      <Header />
      <Center mb={20}>
        <Stack align="center" spacing={0}>
          <Image
            src="logo.png"
            alt="Recipe Finder"
            height={150}
          />
        </Stack>
      </Center>

      <Group className="search-container">
        <TextInput
          placeholder="Search by recipe or ingredients"
          leftSection={<IconSearch size={16} />}
          style={{ flex: 1 }}
          radius="md"
          size="md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch} color="orange" radius="md" size="md">
          Search
        </Button>
      </Group>

      <Box>
        <Image
          src="https://img-global.cpcdn.com/contest_banners/2e21d62bd73464b9/966x183cq70/banner.webp"
          alt="Spring Feasts"
          className="banner"
          radius="md"
        />
      </Box>

      {/* Content here */}
      <PopularSearches />
      <RecipesList />

    </Box>
  );
}

export default HomePage;