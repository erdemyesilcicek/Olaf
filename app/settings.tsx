import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { profileViewModel, ProfileViewModelState } from '../viewmodels/ProfileViewModel';

export default function Settings() {
  const [vmState, setVmState] = useState<ProfileViewModelState>(profileViewModel.getState());

  // Avatar options matching the profile page
  const avatarOptions = [
    require('../assets/images/olaf.png'),
    require('../assets/images/dog.png'),
    require('../assets/images/cat.png'),
    require('../assets/images/horse.png'),
    require('../assets/images/elephant.png'),
    require('../assets/images/tiger.png'),
  ];

  // Component mount olduğunda ViewModel'i dinle ve profil bilgilerini yükle
  useEffect(() => {
    const handleStateChange = (state: ProfileViewModelState) => {
      setVmState(state);
    };

    profileViewModel.addListener(handleStateChange);
    profileViewModel.loadSavedProfile();

    return () => {
      profileViewModel.removeListener(handleStateChange);
    };
  }, []);

  // Sayfa focus olduğunda profil bilgilerini yeniden yükle
  useFocusEffect(
    useCallback(() => {
      profileViewModel.loadSavedProfile();
    }, [])
  );
  const handleProfilePress = () => {
    router.push('/edit-profile');
  };

  const handleOptionPress = (option: string) => {
    switch (option) {
      case 'privacy':
        Alert.alert('Gizlilik', 'Gizlilik ayarları burada yapılacak');
        break;
      case 'theme':
        Alert.alert('Tema', 'Tema ayarları burada yapılacak');
        break;
      case 'language':
        Alert.alert('Dil', 'Dil ayarları burada yapılacak');
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
      id: 'language',
      title: 'Dil',
      subtitle: 'Uygulama dili seçimi',
      icon: 'globe',
      color: '#3B82F6'
    },
    {
      id: 'theme',
      title: 'Tema',
      subtitle: 'Görünüm ve tema ayarları',
      icon: 'palette',
      color: '#8B5CF6'
    },
    {
      id: 'privacy',
      title: 'Gizlilik ve Güvenlik',
      subtitle: 'Gizlilik ayarlarını düzenle',
      icon: 'shield',
      color: '#10B981'
    },
    {
      id: 'support',
      title: 'Destek',
      subtitle: 'Yardım ve destek al',
      icon: 'help-circle',
      color: '#F59E0B'
    },
    {
      id: 'about',
      title: 'Hakkında',
      subtitle: 'Uygulama bilgileri',
      icon: 'info',
      color: '#6366F1'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Card */}
          <TouchableOpacity style={styles.profileCard} onPress={handleProfilePress} activeOpacity={0.7}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={avatarOptions[vmState.selectedAvatar]}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {vmState.userDisplayName || vmState.userName || 'Kullanıcı Adı'}
              </Text>
              <Text style={styles.profileEmail}>
                {vmState.userEmail || 'kullanici@email.com'}
              </Text>
            </View>
            <View style={styles.editProfile}>
              <Icon name="chevron-right" size={20} color="#9CA3AF" />
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

          <View style={{ height: 30 }} />
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
  profileImageContainer: {
    marginRight: 16,
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 30,
    padding: 4,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F3F4F6',
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
    marginBottom: 8,
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
    paddingVertical: 12,
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
