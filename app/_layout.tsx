import { Stack, router, usePathname } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import NavigationBar from "../components/NavigationBar";

export default function RootLayout() {
  const pathname = usePathname();

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

  const handleSettingsPress = () => {
    Alert.alert(
      'Ayarlar',
      'Hangi ayara gitmek istiyorsunuz?',
      [
        { text: 'Bildirimler', onPress: () => console.log('Bildirimler') },
        { text: 'Gizlilik', onPress: () => console.log('Gizlilik') },
        { text: 'Hesap', onPress: () => console.log('Hesap') },
        { text: 'Hakkında', onPress: () => console.log('Hakkında') },
        { text: 'İptal', style: 'cancel' }
      ]
    );
  };

  const getPageInfo = () => {
    switch (pathname) {
      case '/':
        return { title: 'Ana Sayfa', subtitle: 'Günlük motivasyon ve ilham' };
      case '/favorites':
        return { title: 'Favoriler', subtitle: 'Beğendiğiniz motivasyon kartları' };
      case '/history':
        return { title: 'Geçmiş', subtitle: 'Daha önce oluşturduğunuz kartlar' };
      case '/create':
        return { title: 'Oluştur', subtitle: 'Yeni motivasyon kartı oluşturun' };
      case '/profile':
        return { title: 'Profil', subtitle: 'Profil bilgileriniz ve ayarlarınız' };
      default:
        return { title: 'Olaf', subtitle: 'Motivasyon uygulaması' };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{pageInfo.title}</Text>
          <Text style={styles.subtitle}>{pageInfo.subtitle}</Text>
        </View>
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={handleSettingsPress}
          activeOpacity={0.7}
        >
          <Icon name="settings" size={24} color="#6B73FF" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Stack 
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        />
      </View>
      
      <NavigationBar onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  headerLeft: {
    flex: 1,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 0,
  },
});
