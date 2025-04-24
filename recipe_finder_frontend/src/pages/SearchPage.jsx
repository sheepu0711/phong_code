import {
  Box,
  Button,
  Center,
  Group,
  Image,
  Loader,
  Paper,
  SimpleGrid,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconClock, IconSearch, IconStar, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiRequest } from "../api/api";
import Header from "../components/Header";

function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [activeTab, setActiveTab] = useState("latest");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [withIngredients, setWithIngredients] = useState("");
  const [withoutIngredients, setWithoutIngredients] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const params = {
        q: searchQuery,
        withIngredients: withIngredients,
        withoutIngredients: withoutIngredients,
        sort: activeTab === "latest" ? "createdAt" : "rating",
      };

      const response = await apiRequest("get", "/search", params);
      if (response) {
        setSearchResults(response);
      }
    } catch (error) {
      console.error("Error searching recipes:", error);
      setError("Failed to search recipes. Please try again.");
    } finally {
      setLoading(false);
    }

    // Update URL
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("q", searchQuery);
    window.history.pushState(
      {},
      "",
      `${location.pathname}?${searchParams.toString()}`
    );
  };

  // Fetch initial search results when component mounts
  useEffect(() => {
    if (queryParam) {
      handleSearch({ preventDefault: () => {} });
    }
  }, []);

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
                style={{ width: "50%" }}
                size="md"
                leftSection={<IconSearch size={20} />}
              />
              <Button type="submit" color="orange" size="md" loading={loading}>
                Search
              </Button>
            </Group>
          </form>

          <Box
            p="xl"
            bg="rgba(255, 248, 225, 0.5)"
            style={{ borderRadius: "8px" }}
          >
            <Title order={3} mb="lg">
              Filters
            </Title>

            <Text fw={500} mb="xs">
              Show me recipes with:
            </Text>
            <TextInput
              placeholder="Type ingredients..."
              value={withIngredients}
              onChange={(e) => setWithIngredients(e.target.value)}
              mb="md"
              leftSection={<IconSearch size={16} />}
            />

            <Text fw={500} mb="xs">
              Show me recipes without:
            </Text>
            <TextInput
              placeholder="Type ingredients..."
              value={withoutIngredients}
              onChange={(e) => setWithoutIngredients(e.target.value)}
              mb="md"
              leftSection={<IconSearch size={16} />}
            />
          </Box>

          <Tabs value={activeTab} onChange={setActiveTab} mb="xl">
            <Group position="center">
              <Tabs.List>
                <Tabs.Tab value="latest">Latest</Tabs.Tab>
                <Tabs.Tab value="popular">Popular</Tabs.Tab>
              </Tabs.List>
            </Group>
          </Tabs>

          <Title order={2} mb="lg">
            {queryParam} recipes{" "}
            {searchResults.length > 0 ? `(${searchResults.length})` : "(0)"}
          </Title>

          {loading ? (
            <Center py={50}>
              <Loader size="lg" color="orange" />
            </Center>
          ) : error ? (
            <Center py={50}>
              <Text c="red" ta="center">
                {error}
              </Text>
            </Center>
          ) : searchResults.length > 0 ? (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing="lg">
              {searchResults.map((recipe) => (
                <Paper
                  key={recipe._id}
                  shadow="sm"
                  p="md"
                  radius="md"
                  withBorder
                >
                  <Link
                    to={`/recipe/${recipe._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Image
                      src={recipe.mainImage}
                      height={200}
                      radius="md"
                      mb="md"
                      alt={recipe.title}
                    />
                    <Title order={4} mb="xs">
                      {recipe.title}
                    </Title>
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
                      <Text size="sm">{recipe.cookTime}</Text>
                      <Text size="sm">•</Text>
                      <Text size="sm">{recipe.difficulty}</Text>
                    </Group>
                  </Link>
                </Paper>
              ))}
            </SimpleGrid>
          ) : (
            <Box py={50} style={{ textAlign: "center" }}>
              <Center mb={20}>
                <div style={{ width: "80px", height: "80px" }}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    style={{ color: "#666" }}
                  >
                    <path d="M12 6C8.5 6 8 9.5 8 11V14H16V11C16 9.5 15.5 6 12 6Z" />
                    <path d="M19 14C19 15.86 15.866 20 12 20C8.134 20 5 15.86 5 14C5 13.4696 5.21071 12.9609 5.58579 12.5858C5.96086 12.2107 6.46957 12 7 12H17C17.5304 12 18.0391 12.2107 18.4142 12.5858C18.7893 12.9609 19 13.4696 19 14Z" />
                  </svg>
                </div>
              </Center>
              <Title order={3} mb="sm">
                Can't find a recipe?
              </Title>
              <Text c="dimmed" mb="xl">
                Be the first and share your own. Join the fun and help
                <br />
                your fellow cooks!
              </Text>
              <Button
                color="gray"
                variant="outline"
                component={Link}
                to="/create-recipe"
              >
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
