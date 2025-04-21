import { useState } from 'react';
import { Paper, Title, TextInput, PasswordInput, Button, Group, Text, Divider, Anchor, Center } from '@mantine/core';
import { IconAt, IconLock, IconBrandGoogle, IconBrandFacebook } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      navigate('/'); // Redirect to home page after login
    }, 1000);
  };

  return (
    <Center style={{ height: 'calc(100vh - 80px)' }}>
      <Paper radius="md" p="xl" withBorder shadow="md" style={{ width: 400 }}>
        <Title order={2} ta="center" mt="md" mb={30}>
          Welcome back to Recipe Finder
        </Title>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email address"
            placeholder="hello@example.com"
            size="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftSection={<IconAt size={16} />}
            required
            mb="md"
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            size="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftSection={<IconLock size={16} />}
            required
            mb={15}
          />

          <Group justify="space-between" mb={15}>
            <Anchor component={Link} to="/forgot-password" c="dimmed" size="sm" underline="always">
              Forgot your password?
            </Anchor>
          </Group>

          <Button fullWidth type="submit" size="md" color="orange" loading={loading}>
            Sign in
          </Button>
        </form>

        <Divider label="Or continue with" labelPosition="center" my="lg" />

        <Group grow mb="md">
          <Button variant="outline" leftSection={<IconBrandGoogle size={16} />}>
            Google
          </Button>
          <Button variant="outline" leftSection={<IconBrandFacebook size={16} />}>
            Facebook
          </Button>
        </Group>

        <Text ta="center" mt="md">
          Don't have an account?{' '}
          <Anchor component={Link} to="/register" weight={700}>
            Sign up
          </Anchor>
        </Text>
      </Paper>
    </Center>
  );
}

export default LoginPage;