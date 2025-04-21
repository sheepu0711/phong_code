import { Box, Title, Text, Card, Avatar, Grid, Button, TextInput, PasswordInput, Switch, Divider, Group, List } from '@mantine/core';
import { IconUser, IconAt, IconSettings, IconBell, IconReceipt, IconLogout } from '@tabler/icons-react';
import Header from '../components/Header';

function AccountPage() {
  return (
    <Box>
      <Header />
      <Box p="xl">
        <Grid>
          {/* Left side - Account info */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section p="lg" style={{ textAlign: 'center' }}>
                <Avatar 
                  size={120} 
                  radius={120} 
                  mx="auto" 
                  color="orange" 
                  src={null}
                >
                  <IconUser size={80} />
                </Avatar>
                <Title order={3} mt="md">John Doe</Title>
                <Text c="dimmed">@johndoe</Text>
                <Button variant="outline" size="xs" mt="xs">
                  Edit Profile
                </Button>
              </Card.Section>
              
              <List spacing="xs" mt="md" center>
                <List.Item icon={<IconReceipt size={16} />}>20 Recipes Created</List.Item>
                <List.Item icon={<IconAt size={16} />}>john.doe@example.com</List.Item>
                <List.Item icon={<IconBell size={16} />}>Notifications: On</List.Item>
              </List>
              
              <Divider my="md" />
              
              <Group position="center">
                <Button variant="subtle" leftSection={<IconLogout size={16} />} color="red">
                  Sign Out
                </Button>
              </Group>
            </Card>
          </Grid.Col>
          
          {/* Right side - Account settings */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
              <Group mb="md">
                <IconSettings size={20} />
                <Title order={3}>Account Settings</Title>
              </Group>
              
              <TextInput
                label="Display Name"
                placeholder="Your name"
                defaultValue="John Doe"
                mb="md"
              />
              
              <TextInput
                label="Username"
                placeholder="Your username"
                defaultValue="johndoe"
                mb="md"
              />
              
              <TextInput
                label="Email"
                placeholder="Your email"
                defaultValue="john.doe@example.com"
                mb="md"
              />
              
              <PasswordInput
                label="Current Password"
                placeholder="Enter your current password"
                mb="md"
              />
              
              <PasswordInput
                label="New Password"
                placeholder="Enter new password"
                mb="md"
              />
              
              <PasswordInput
                label="Confirm New Password"
                placeholder="Confirm new password"
                mb="md"
              />
              
              <Button color="orange" mt="md">
                Save Changes
              </Button>
            </Card>
            
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">Preferences</Title>
              
              <Switch 
                label="Email notifications for new cooking challenges" 
                defaultChecked 
                mb="md"
              />
              
              <Switch 
                label="Receive weekly recipe recommendations" 
                defaultChecked 
                mb="md"
              />
              
              <Switch 
                label="Dark mode" 
                mb="md"
              />
              
              <Switch 
                label="Show measurements in metric units (g, ml)" 
                mb="md"
              />
              
              <Switch 
                label="Make profile public" 
                defaultChecked 
                mb="md"
              />
              
              <Divider my="md" labelPosition="center" label="Privacy" />
              
              <Text size="sm" c="dimmed" mb="md">
                We value your privacy. Your account information is only used to enhance your experience on Cookpad.
              </Text>
              
              <Button variant="outline" color="gray">
                Privacy Settings
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
}

export default AccountPage;