import {Text, Card, Image, Button, ActionIcon, Group, Divider } from '@mantine/core';
import { IconHeart, IconBookmark, IconStar } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function RecipeCard({ id, image, title, author, rating }) {
  return (
    <Card key={id} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Link to={`/recipe/${id}`}>
          <Image
            src={image}
            height={160}
            alt={title}
          />
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
        <Button variant="light" color="blue" radius="md" component={Link} to={`/recipe/${id}`}>
          View Recipe
        </Button>
        <ActionIcon variant="subtle" color="red">
          <IconHeart size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle" color="blue" size="lg">
          <IconBookmark size={18} />
        </ActionIcon>
      </Group>
    </Card>
  );
}

export default RecipeCard;