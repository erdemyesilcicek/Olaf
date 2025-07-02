import { router } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

export default function Settings() {
  const handleProfilePress = () => {
    router.push('/edit-profile');
  };

  const handleOptionPress = (option: string) => {
    switch (option) {
      case 'notifications':
        Alert.alert('Bildirimler', 'Bildirim ayarları burada yapılacak');
        break;
      case 'privacy':
        Alert.alert('Gizlilik', 'Gizlilik ayarları burada yapılacak');
        break;
      case 'account':
        Alert.alert('Hesap', 'Hesap ayarları burada yapılacak');
        break;
      case 'theme':
        Alert.alert('Tema', 'Tema ayarları burada yapılacak');
        break;
      case 'language':
        Alert.alert('Dil', 'Dil ayarları burada yapılacak');
        break;
      case 'backup':
        Alert.alert('Yedekleme', 'Veri yedekleme ayarları burada yapılacak');
        break;
      case 'about':
        Alert.alert(
          'Hakkında',
          'Olaf - Motivasyon Uygulaması\nVersiyon 1.0.0\n\nGeliştirici: Olaf Team\n© 2025 Tüm hakları saklıdır.'
        );
        break;
      case 'support':
        Alert.alert('Destek', 'Destek talebi oluşturma sayfası burada olacak');
        break;
    }
  };

  const settingsOptions = [
    {
      id: 'notifications',
      title: 'Bildirimler',
      subtitle: 'Push bildirimlerini yönet',
      icon: 'bell',
      color: '#FF6B6B'
    },
    {
      id: 'privacy',
      title: 'Gizlilik ve Güvenlik',
      subtitle: 'Gizlilik ayarlarını düzenle',
      icon: 'shield',
      color: '#4ECDC4'
    },
    {
      id: 'account',
      title: 'Hesap Ayarları',
      subtitle: 'Profil ve hesap bilgileri',
      icon: 'user',
      color: '#45B7D1'
    },
    {
      id: 'theme',
      title: 'Tema',
      subtitle: 'Görünüm ve tema ayarları',
      icon: 'palette',
      color: '#96CEB4'
    },
    {
      id: 'language',
      title: 'Dil',
      subtitle: 'Uygulama dili seçimi',
      icon: 'globe',
      color: '#FECA57'
    },
    {
      id: 'backup',
      title: 'Yedekleme',
      subtitle: 'Verilerinizi yedekleyin',
      icon: 'download-cloud',
      color: '#FF9FF3'
    },
    {
      id: 'support',
      title: 'Destek',
      subtitle: 'Yardım ve destek al',
      icon: 'help-circle',
      color: '#54A0FF'
    },
    {
      id: 'about',
      title: 'Hakkında',
      subtitle: 'Uygulama bilgileri',
      icon: 'info',
      color: '#5F27CD'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Card */}
          <TouchableOpacity style={styles.profileCard} onPress={handleProfilePress} activeOpacity={0.7}>
            <View style={styles.profileIcon}>
              <Icon name="user" size={32} color="#6B73FF" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Kullanıcı Adı</Text>
              <Text style={styles.profileEmail}>kullanici@email.com</Text>
            </View>
            <View style={styles.editProfile}>
              <Icon name="edit-2" size={16} color="#6B73FF" />
            </View>
          </TouchableOpacity>

          {/* Settings Options */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Ayarlar</Text>
            {settingsOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.settingItem}
                onPress={() => handleOptionPress(option.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.settingIcon, { backgroundColor: option.color }]}>
                  <Icon name={option.icon} size={20} color="#fff" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{option.title}</Text>
                  <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
                </View>
                <Icon name="chevron-right" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={styles.appVersion}>Olaf v1.0.0</Text>
            <Text style={styles.appCopyright}>© 2025 Olaf Team</Text>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  editProfile: {
    padding: 8,
  },
  settingsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appVersion: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
