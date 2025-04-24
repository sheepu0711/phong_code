import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Image,
  List,
  Paper,
  Rating,
  Tabs,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconBookmark,
  IconBookmarkFilled,
  IconChefHat,
  IconClock,
  IconHeart,
  IconHeartFilled,
  IconMapPin,
  IconPrinter,
  IconShare,
  IconStar,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../api/api";
import Header from "../components/Header";

function RecipeDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("ingredients");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [bookmarks, setBookmarks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [recipeData, setRecipeData] = useState();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page in history
  };

  useEffect(() => {
    fetchRecipe();
    getBookmarks();
    getFavorites();
  }, []);

  // Hàm lấy bookmarks
  const getBookmarks = async () => {
    try {
      const response = await apiRequest("get", "/users/bookmarks");
      if (response) {
        const bookmarkIds = response.map((item) => item._id);
        setBookmarks(bookmarkIds); // Cập nhật state
        return bookmarkIds;
      }
      return [];
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      return [];
    }
  };

  // Hàm lấy favorites
  const getFavorites = async () => {
    try {
      const response = await apiRequest("get", "/users/favorites");
      if (response) {
        const favoriteIds = response.map((item) => item._id);
        setFavorites(favoriteIds); // Cập nhật state
        return favoriteIds;
      }
      return [];
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }
  };

  const fetchRecipe = async () => {
    try {
      const response = await apiRequest("get", `/recipes/${id}`);
      if (response) {
        // Xử lý dữ liệu recipe
        setRecipeData(response);
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    await toggleBookmark(id);
    setLoading(false);
  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    await toggleFavorite(id);
    setLoading(false);
  };

  // Hàm thêm/xóa bookmark
  const toggleBookmark = async (recipeId) => {
    try {
      const isBookmarked = bookmarks.includes(recipeId);

      const endpoint = isBookmarked
        ? `/users/bookmarks/${recipeId}` // Endpoint cho delete
        : `/users/bookmarks`; // Endpoint cho post
      const response = await apiRequest(
        isBookmarked ? "delete" : "post",
        endpoint,
        {
          recipeId,
        }
      );
      if (response) {
        // Cập nhật state bookmarks
        setBookmarks((prev) =>
          prev.includes(recipeId)
            ? prev.filter((id) => id !== recipeId)
            : [...prev, recipeId]
        );
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  // Hàm thêm/xóa favorite
  const toggleFavorite = async (recipeId) => {
    try {
      const isFavorite = favorites.includes(recipeId);
      // Sử dụng endpoint khác nhau cho post và delete
      const endpoint = isFavorite
        ? `/users/favorites/${recipeId}` // Endpoint cho delete
        : `/users/favorites`; // Endpoint cho post
      const response = await apiRequest(
        isFavorite ? "delete" : "post",
        endpoint,
        {
          recipeId,
        }
      );
      if (response) {
        // Cập nhật state favorites
        setFavorites((prev) =>
          prev.includes(recipeId)
            ? prev.filter((id) => id !== recipeId)
            : [...prev, recipeId]
        );
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Dummy recipe data - in a real app, you would fetch this based on the ID
  // const recipeData = {
  //   id: id,
  //   title: id === '101' ? 'Cucumber + Wakame Salad' :
  //          id === '102' ? 'Korean Style Cucumber Kimchi' :
  //          id === '103' ? 'Creamy Ranch Cucumber Salad' :
  //          id === '104' ? '24-Hour Marinated Cucumbers' :
  //          id === '201' ? 'Korean Cucumber Salad' :
  //          id === '202' ? 'Quick Chicken Stir Fry' :
  //          id === '203' ? 'Spicy Miso Ramen' : 'Delicious Recipe',
  //   author: 'Chef Julia',
  //   authorImage: '/api/placeholder/50/50',
  //   location: 'San Francisco, CA',
  //   rating: 4.7,
  //   reviewCount: 156,
  //   cookTime: '25 mins',
  //   prepTime: '15 mins',
  //   servings: 4,
  //   difficulty: 'Easy',
  //   description: 'This refreshing recipe is perfect for hot summer days. Light, crisp, and full of flavor, it makes a great side dish for grilled meats or a light lunch option.',
  //   image: id === '101' || id === '201' ? 'https://img-global.cpcdn.com/recipes/5445850674561024/400x400cq70/photo.jpg' :
  //          id === '102' || id === '202' ? 'https://img-global.cpcdn.com/recipes/cadc6c8abff9f4d9/400x400cq70/photo.jpg' :
  //          id === '103' || id === '203' ? 'https://img-global.cpcdn.com/recipes/6059095305625600/400x400cq70/photo.jpg' :
  //          'https://img-global.cpcdn.com/recipes/5831b2b56efd5594/400x400cq70/photo.jpg',
  //   ingredients: [
  //     '2 large cucumbers, thinly sliced',
  //     '1/4 cup rice vinegar',
  //     '2 tablespoons sugar',
  //     '1 teaspoon salt',
  //     '2 tablespoons sesame oil',
  //     '1 tablespoon toasted sesame seeds',
  //     '1/4 cup dried wakame seaweed, rehydrated',
  //     '1 clove garlic, minced',
  //     '1 green onion, thinly sliced'
  //   ],
  //   instructions: [
  //     'Slice cucumbers thinly and place in a colander. Sprinkle with salt and let stand for 10 minutes to draw out excess moisture.',
  //     'In a small bowl, mix rice vinegar, sugar, and sesame oil until sugar dissolves.',
  //     'Rinse and squeeze out excess water from the wakame seaweed. Chop into small pieces if needed.',
  //     'Pat the cucumbers dry with paper towels and place in a large bowl.',
  //     'Add the wakame, garlic, and green onions to the cucumbers.',
  //     'Pour the dressing over the cucumber mixture and toss gently to combine.',
  //     'Sprinkle with toasted sesame seeds.',
  //     'Refrigerate for at least 30 minutes before serving to allow flavors to meld.'
  //   ],
  //   nutrition: {
  //     calories: 120,
  //     fat: '7g',
  //     carbs: '15g',
  //     protein: '2g',
  //     sodium: '620mg',
  //     fiber: '3g'
  //   },
  //   tags: ['Salad', 'Japanese', 'Vegan', 'Gluten-Free', 'Low-Calorie'],
  //   relatedRecipes: [
  //     { id: 101, title: 'Japanese Cucumber Salad', image: '/api/placeholder/200/150' },
  //     { id: 102, title: 'Korean Cucumber Kimchi', image: '/api/placeholder/200/150' },
  //     { id: 103, title: 'Thai Cucumber Salad', image: '/api/placeholder/200/150' }
  //   ],
  //   reviews: [
  //     {
  //       id: 1,
  //       user: 'Sarah L.',
  //       avatar: '/api/placeholder/40/40',
  //       rating: 5,
  //       date: '2 weeks ago',
  //       comment: 'Perfect summer recipe! I added a little bit of chili flakes for some heat and it was delicious.'
  //     },
  //     {
  //       id: 2,
  //       user: 'Mike T.',
  //       avatar: '/api/placeholder/40/40',
  //       rating: 4,
  //       date: '1 month ago',
  //       comment: 'Great flavor combination. I used less sugar and it was still tasty.'
  //     },
  //     {
  //       id: 3,
  //       user: 'Lisa R.',
  //       avatar: '/api/placeholder/40/40',
  //       rating: 5,
  //       date: '2 months ago',
  //       comment: 'Made this for a potluck and everyone loved it! Will definitely make again.'
  //     }
  //   ]
  // };

  return (
    <Box>
      <Header />
      <Box p="xl">
        {/* Back Button */}
        <Button
          leftSection={<IconArrowLeft size={16} />}
          variant="subtle"
          color="gray"
          onClick={handleGoBack}
          mb="md"
        >
          Back
        </Button>

        <Grid>
          {/* Left column - Recipe details */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Box>
              <Title order={1} mb="xs">
                {recipeData?.title}
              </Title>

              <Group mb="md">
                <Group spacing={8}>
                  <Avatar src={recipeData?.authorImage} radius="xl" size="sm" />
                  <Text size="sm" fw={500}>
                    By {recipeData?.author}
                  </Text>
                </Group>

                <Group spacing={5}>
                  <IconMapPin size={14} />
                  <Text size="sm" c="dimmed">
                    {recipeData?.location}
                  </Text>
                </Group>

                <Group spacing={5}>
                  <IconStar size={14} color="#FFD700" />
                  <Text size="sm">{recipeData?.rating}</Text>
                  <Text size="sm" c="dimmed">
                    ({recipeData?.reviewCount} reviews)
                  </Text>
                </Group>
              </Group>

              <Image
                src={recipeData?.mainImage}
                height={400}
                radius="md"
                alt={recipeData?.title}
                mb="lg"
              />

              <Group mb="lg" position="apart">
                <Group>
                  <Box>
                    <Text size="sm" c="dimmed">
                      Prep Time
                    </Text>
                    <Group spacing={5}>
                      <IconClock size={16} />
                      <Text>{recipeData?.prepTime}</Text>
                    </Group>
                  </Box>

                  <Box>
                    <Text size="sm" c="dimmed">
                      Cook Time
                    </Text>
                    <Group spacing={5}>
                      <IconClock size={16} />
                      <Text>{recipeData?.cookTime}</Text>
                    </Group>
                  </Box>

                  <Box>
                    <Text size="sm" c="dimmed">
                      Servings
                    </Text>
                    <Group spacing={5}>
                      <IconUsers size={16} />
                      <Text>{recipeData?.servings}</Text>
                    </Group>
                  </Box>

                  <Box>
                    <Text size="sm" c="dimmed">
                      Difficulty
                    </Text>
                    <Group spacing={5}>
                      <IconChefHat size={16} />
                      <Text>{recipeData?.difficulty}</Text>
                    </Group>
                  </Box>
                </Group>

                <Group>
                  <ActionIcon
                    variant="light"
                    color="red"
                    size="lg"
                    onClick={handleFavorite}
                  >
                    {favorites.includes(id) ? (
                      <IconHeartFilled size={18} />
                    ) : (
                      <IconHeart size={18} />
                    )}
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    color="blue"
                    size="lg"
                    onClick={handleBookmark}
                  >
                    {bookmarks.includes(id) ? (
                      <IconBookmarkFilled size={18} />
                    ) : (
                      <IconBookmark size={18} />
                    )}
                  </ActionIcon>
                  <ActionIcon variant="light" size="lg">
                    <IconPrinter size={18} />
                  </ActionIcon>
                  <ActionIcon variant="light" size="lg">
                    <IconShare size={18} />
                  </ActionIcon>
                </Group>
              </Group>

              <Text mb="lg">{recipeData?.description}</Text>

              <Group mb="md" spacing={8}>
                {recipeData?.tags?.map((tag, index) => (
                  <Badge key={index} color="orange" variant="light">
                    {tag}
                  </Badge>
                ))}
              </Group>

              <Divider my="lg" />

              <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List mb="md">
                  <Tabs.Tab value="ingredients">Ingredients</Tabs.Tab>
                  <Tabs.Tab value="instructions">Instructions</Tabs.Tab>
                  <Tabs.Tab value="nutrition">Nutrition Info</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="ingredients">
                  <List spacing="sm" size="md" type="ordered">
                    {recipeData?.ingredients?.map((ingredient, index) => (
                      <List.Item key={index}>
                        {typeof ingredient === "object"
                          ? ingredient.name
                          : ingredient}
                      </List.Item>
                    ))}
                  </List>
                </Tabs.Panel>

                <Tabs.Panel value="instructions">
                  <List spacing="sm" size="md" type="ordered">
                    {recipeData?.instructions?.map((step, index) => (
                      <List.Item key={index}>{step}</List.Item>
                    ))}
                  </List>
                </Tabs.Panel>

                <Tabs.Panel value="nutrition">
                  <Paper withBorder p="md" radius="md">
                    <Title order={4} mb="sm">
                      Nutrition Facts (per serving)
                    </Title>
                    <Grid>
                      <Grid.Col span={6}>
                        <Text fw={500}>Calories:</Text>
                        <Text>{recipeData?.nutrition.calories}</Text>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Text fw={500}>Fat:</Text>
                        <Text>{recipeData?.nutrition.fat}</Text>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Text fw={500}>Carbohydrates:</Text>
                        <Text>{recipeData?.nutrition.carbs}</Text>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Text fw={500}>Protein:</Text>
                        <Text>{recipeData?.nutrition.protein}</Text>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Text fw={500}>Sodium:</Text>
                        <Text>{recipeData?.nutrition.sodium}</Text>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Text fw={500}>Fiber:</Text>
                        <Text>{recipeData?.nutrition.fiber}</Text>
                      </Grid.Col>
                    </Grid>
                  </Paper>
                </Tabs.Panel>
              </Tabs>

              <Divider my="xl" label="Reviews" labelPosition="center" />

              <Box mb="xl">
                <Title order={3} mb="md">
                  Reviews ({recipeData?.reviews?.length || 0})
                </Title>

                {recipeData?.reviews?.map((review) => (
                  <Paper key={review.id} p="md" withBorder mb="md">
                    <Group position="apart" mb="xs">
                      <Group>
                        <Avatar src={review.avatar} radius="xl" />
                        <div>
                          <Text fw={500}>{review.user}</Text>
                          <Text size="xs" c="dimmed">
                            {review.date}
                          </Text>
                        </div>
                      </Group>
                      <Rating value={review.rating} readOnly size="sm" />
                    </Group>
                    <Text>{review.comment}</Text>
                  </Paper>
                ))}

                <Paper p="md" withBorder>
                  <Title order={4} mb="sm">
                    Leave a Review
                  </Title>
                  <Rating mb="md" />
                  <Textarea
                    placeholder="Share your experience with this recipe..."
                    minRows={3}
                    mb="md"
                  />
                  <Button color="orange">Submit Review</Button>
                </Paper>
              </Box>
            </Box>
          </Grid.Col>

          {/* Right column - Related recipes */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper p="md" withBorder>
              <Title order={3} mb="md">
                You Might Also Like
              </Title>

              {recipeData?.relatedRecipes?.map((recipe) => (
                <Group key={recipe.id} mb="md" noWrap>
                  <Image
                    src={recipe.image}
                    width={80}
                    height={60}
                    radius="md"
                    alt={recipe.title}
                  />
                  <Box>
                    <Text
                      fw={500}
                      component={Link}
                      to={`/recipe/${recipe.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {recipe.title}
                    </Text>
                    <Rating value={4.5} readOnly size="xs" />
                  </Box>
                </Group>
              ))}

              <Button
                variant="outline"
                color="orange"
                fullWidth
                mt="md"
                component={Link}
                to="/search"
              >
                Browse More Recipes
              </Button>
            </Paper>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
}

export default RecipeDetailPage;
