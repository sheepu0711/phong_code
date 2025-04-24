import { Avatar, Button, Group, Image, Menu } from "@mantine/core";
import {
  IconHeart,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { isAuthenticated, userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Đảm bảo userInfo luôn có giá trị hợp lệ
  const userName = userInfo?.name || "User";
  const userAvatar = userInfo?.avatar || null;

  return (
    <div className="header">
      <Group>
        <Link to="/">
          <Image src="/logo.png" alt="Cookpad" width={10} height={70} />
        </Link>
      </Group>
      <Group>
        {!isAuthenticated ? (
          <>
            <Button component={Link} to="/login" variant="subtle">
              Login
            </Button>
            <Button component={Link} to="/register" color="orange">
              Register
            </Button>
          </>
        ) : (
          // UI khi đã đăng nhập
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="subtle">
                <Avatar src={userAvatar} radius="xl" size="sm" alt={userName} />
                <span style={{ marginLeft: "8px" }}>{userName}</span>
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component={Link}
                to="/account"
                icon={<IconUser size={14} />}
              >
                Account
              </Menu.Item>
              <Menu.Item
                component={Link}
                to="/recipes"
                icon={<IconHeart size={14} />}
              >
                Recipes
              </Menu.Item>
              <Menu.Item
                component={Link}
                to="/settings"
                icon={<IconSettings size={14} />}
              >
                Settings
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                onClick={handleLogout}
                icon={<IconLogout size={14} />}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </div>
  );
}

export default Header;
