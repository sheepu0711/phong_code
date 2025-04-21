import { Group, Button, Image } from '@mantine/core';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <Group>
        <Link to="/">
          <Image 
            src="/logo.png" 
            alt="Cookpad"
            width={10}
            height={70}
          />
        </Link>
      </Group>
      <Group>
        <Button component={Link} to="/login" variant="subtle">Login</Button>
        <Button component={Link} to="/register" color="orange">Register</Button>
      </Group>
    </div>
  );
}

export default Header;