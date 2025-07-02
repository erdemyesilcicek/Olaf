import { Stack, router, usePathname } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    router.push('/settings');
  };

  const handleBackPress = () => {
    router.back();
  };

  const canGoBack = () => {
    // Ana sayfalar dışında geri butonu göster
    const mainPages = ['/', '/favorites', '/history', '/create', '/profile'];
    return !mainPages.includes(pathname);
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
      case '/settings':
        return { title: 'Ayarlar', subtitle: 'Uygulama ayarları ve tercihler' };
      case '/edit-profile':
        return { title: 'Profil Düzenle', subtitle: 'Profil bilgilerinizi güncelleyin' };
      default:
        return { title: 'Olaf', subtitle: 'Motivasyon uygulaması' };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        {canGoBack() && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Icon name="arrow-left" size={24} color="#6B73FF" />
          </TouchableOpacity>
        )}
        
        {/* Title Section */}
        <View style={styles.headerCenter}>
          <Text style={styles.title}>{pageInfo.title}</Text>
          <Text style={styles.subtitle}>{pageInfo.subtitle}</Text>
        </View>
        
        {/* Menu Button */}
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={handleSettingsPress}
          activeOpacity={0.7}
        >
          <Icon name="menu" size={24} color="#6B73FF" />
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#f5f5f5',
    minHeight: 100,
  },
  backButton: {
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerCenter: {
    flex: 1,
    justifyContent: 'center',
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
