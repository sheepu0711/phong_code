import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Text,
} from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconHeart,
  IconHeartFilled,
  IconStar,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api/api";

function RecipeCard({ id, image, title, author, rating }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [bookmarks, setBookmarks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // Kiểm tra xem image có phải là base64 không
  const isBase64 =
    image && typeof image === "string" && image.startsWith("data:image");

  useEffect(() => {
    getBookmarks();
    getFavorites();
  }, []);

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

  // Nếu là base64, sử dụng trực tiếp, nếu không thì kiểm tra xem có phải là URL không
  const imageSrc = isBase64 ? image : image || "/placeholder-image.jpg";
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

  return (
    <Card key={id} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Link to={`/recipe/${id}`}>
          <Image src={imageSrc} height={160} alt={title} fit="cover" />
        </Link>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Group spacing={5}>
          <IconStar size={16} color="#FFD700" />
          <Text size="sm">{rating}</Text>
        </Group>
      </Group>

      <Text size="sm" c="dimmed" mb="md">
        By {author}
      </Text>

      <Divider my="xs" label="Actions" labelPosition="center" />

      <Group position="apart" mt="md">
        <Button
          variant="light"
          color="blue"
          radius="md"
          component={Link}
          to={`/recipe/${id}`}
        >
          View Recipe
        </Button>
        <ActionIcon variant="subtle" color="red" onClick={handleFavorite}>
          {favorites.includes(id) ? (
            <IconHeartFilled size={18} />
          ) : (
            <IconHeart size={18} />
          )}
        </ActionIcon>
        <ActionIcon
          variant="subtle"
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
      </Group>
    </Card>
  );
}

export default RecipeCard;
