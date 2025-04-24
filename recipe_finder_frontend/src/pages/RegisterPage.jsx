import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconAt,
  IconBrandFacebook,
  IconBrandGoogle,
  IconLock,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { apiRequest } from "../api/api";
function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!terms) {
      alert("You must accept the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      const response = await apiRequest("post", "/auth/register", {
        email,
        password,
        username: name,
      });
      if (response) {
        // Simulate registration process
        alert("Account created successfully");
        setTimeout(() => {
          setLoading(false);
          navigate("/login"); // Redirect to home page after registration
        }, 1000);
        //Show toast
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Registration failed";
        alert(errorMessage);
      } else if (error.request) {
        alert("Cannot connect to server. Please check your network.");
      } else {
        alert(error.message || "An error occurred during registration");
      }
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center style={{ height: "calc(100vh - 80px)" }}>
      <Paper radius="md" p="xl" withBorder shadow="md" style={{ width: 400 }}>
        <Title order={2} ta="center" mt="md" mb={30}>
          Create a Recipe Finder Account
        </Title>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            placeholder="Your name"
            size="md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftSection={<IconUser size={16} />}
            required
            mb="md"
          />

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
            mb="md"
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            size="md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftSection={<IconLock size={16} />}
            required
            mb="md"
          />

          <Checkbox
            label="I agree to the terms and conditions"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            mb="md"
          />

          <Button
            fullWidth
            type="submit"
            size="md"
            color="orange"
            loading={loading}
          >
            Create Account
          </Button>
        </form>

        <Divider label="Or continue with" labelPosition="center" my="lg" />

        <Group grow mb="md">
          <Button variant="outline" leftSection={<IconBrandGoogle size={16} />}>
            Google
          </Button>
          <Button
            variant="outline"
            leftSection={<IconBrandFacebook size={16} />}
          >
            Facebook
          </Button>
        </Group>

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Anchor component={Link} to="/login" weight={700}>
            Sign in
          </Anchor>
        </Text>
      </Paper>
      <ToastContainer />
    </Center>
  );
}

export default RegisterPage;
