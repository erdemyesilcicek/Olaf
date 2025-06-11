import { Stack, router } from "expo-router";
import NavigationBar from "../components/NavigationBar";

export default function RootLayout() {
  const handleTabPress = (tabName: string) => {
    switch (tabName) {
      case 'Home':
        router.push('/');
        break;
      case 'Favorites':
        router.push('/favorites');
        break;
      case 'History':
        router.push('/history');
        break;
      case 'Create':
        router.push('/create');
        break;
      case 'Profile':
        router.push('/profile');
        break;
    }
  };

  return (
    <>
      <Stack 
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <NavigationBar onTabPress={handleTabPress} />
    </>
  );
}
