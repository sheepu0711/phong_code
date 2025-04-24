import {
  Anchor,
  Button,
  Center,
  Divider,
  Group,
  Notification,
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
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      console.log("Đang đăng nhập với:", { email, password });

      const response = await apiRequest("post", "/auth/login", {
        email,
        password,
      });

      console.log("Phản hồi đăng nhập:", response);

      if (response && response.token) {
        // Tạo đối tượng userInfo từ response
        const userInfo = {
          id: response._id,
          email: response.email,
          name: response.name || response.email.split("@")[0],
          avatar: response.avatar || null,
        };

        // Gọi hàm login với token và thông tin user đầy đủ
        login(response.token, userInfo);
        navigate("/");
      } else {
        setError("Phản hồi không hợp lệ từ máy chủ");
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      if (err.response?.status === 400) {
        setError(
          err.response?.data?.message || "Email hoặc mật khẩu không đúng"
        );
      } else if (err.response?.status === 500) {
        setError("Lỗi máy chủ. Vui lòng thử lại sau");
      } else if (err.message === "Network Error") {
        setError(
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng"
        );
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await handleLogin(email, password);
  };

  return (
    <Center style={{ height: "calc(100vh - 80px)" }}>
      <Paper radius="md" p="xl" withBorder shadow="md" style={{ width: 400 }}>
        <Title order={2} ta="center" mt="md" mb={30}>
          Chào mừng trở lại với Recipe Finder
        </Title>

        {error && (
          <Notification
            icon={<IconX size={18} />}
            color="red"
            title="Lỗi đăng nhập"
            mb="md"
          >
            {error}
          </Notification>
        )}

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Địa chỉ email"
            placeholder="hello@example.com"
            size="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftSection={<IconAt size={16} />}
            required
            mb="md"
          />

          <PasswordInput
            label="Mật khẩu"
            placeholder="Mật khẩu của bạn"
            size="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftSection={<IconLock size={16} />}
            required
            mb={15}
          />

          <Group justify="space-between" mb={15}>
            <Anchor
              component={Link}
              to="/forgot-password"
              c="dimmed"
              size="sm"
              underline="always"
            >
              Quên mật khẩu?
            </Anchor>
          </Group>

          <Button
            fullWidth
            type="submit"
            size="md"
            color="orange"
            loading={loading}
          >
            Đăng nhập
          </Button>
        </form>

        <Divider label="Hoặc đăng nhập với" labelPosition="center" my="lg" />

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
          Chưa có tài khoản?{" "}
          <Anchor component={Link} to="/register" weight={700}>
            Đăng ký
          </Anchor>
        </Text>
      </Paper>
    </Center>
  );
}

export default LoginPage;
