import { usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface NavigationBarProps {
  onTabPress?: (tabName: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onTabPress }) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('Giriş');

  // Pathname'e göre aktif tab'ı belirle
  useEffect(() => {
    switch (pathname) {
      case '/':
        setActiveTab('Giriş');
        break;
      case '/favorites':
        setActiveTab('Favoriler');
        break;
      case '/history':
        setActiveTab('Geçmiş');
        break;
      case '/create':
        setActiveTab('Create');
        break;
      case '/profile':
        setActiveTab('Profil');
        break;
      default:
        setActiveTab('Giriş');
    }
  }, [pathname]);

  const mainTabs = [
    { name: 'Giriş', icon: 'home', routeName: 'Home' },
    { name: 'Favoriler', icon: 'bookmark', routeName: 'Favorites' },
    { name: 'Geçmiş', icon: 'clock', routeName: 'History' },
    { name: 'Profil', icon: 'user', routeName: 'Profile' }
  ];

  const handleTabPress = (tabName: string) => {
    // Türkçe isimleri route isimlerine çevir
    const routeMapping: { [key: string]: string } = {
      'Giriş': 'Home',
      'Favoriler': 'Favorites', 
      'Geçmiş': 'History',
      'Profil': 'Profile',
      'Create': 'Create'
    };
    
    const routeName = routeMapping[tabName] || tabName;
    onTabPress && onTabPress(routeName);
  };

  return (
    <View style={styles.navigationContainer}>
      {/* Ana navigation bar - sol tarafta oval */}
      <View style={styles.mainNavBar}>
        {mainTabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[
              styles.tab,
              activeTab === tab.name && styles.activeTab
            ]}
            onPress={() => handleTabPress(tab.name)}
            activeOpacity={1}
          >
            <Icon 
              name={tab.icon}
              size={20}
              color={
                activeTab === tab.name 
                  ? '#6B73FF' 
                  : '#9CA3AF'
              }
            />
            <Text style={[
              styles.label,
              activeTab === tab.name && styles.activeLabel
            ]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Create button - sağ tarafta floating */}
      <TouchableOpacity
        style={[
          styles.createButton,
          activeTab === 'Create' && styles.activeCreateButton
        ]}
        onPress={() => handleTabPress('Create')}
        activeOpacity={1}
      >
        <Image 
          source={require('../assets/images/olaf.png')}
          style={[
            styles.createIcon,
            {
              tintColor: activeTab === 'Create' 
                ? '#FFFFFF' 
                : '#6B73FF'
            }
          ]}
        />
        <Text style={[
          styles.createLabel,
          activeTab === 'Create' && styles.activeCreateLabel
        ]}>
          Oluştur
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  mainNavBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    justifyContent: 'space-around',
    minWidth: 180,
  },
  createButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  activeCreateButton: {
    backgroundColor: '#6B73FF',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 20,
    width: 60,
    height: 50,
  },
  activeTab: {
    backgroundColor: '#6B73FF08',
  },
  createIcon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
    marginTop: 2,
  },
  activeLabel: {
    color: '#6B73FF',
    fontWeight: '600',
  },
  createLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
    marginTop: 2,
  },
  activeCreateLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // Eski stilleri kaldırıyoruz
  container: {
    display: 'none',
  },
  icon: {
    display: 'none',
  },
  activeIcon: {
    display: 'none',
  },
  olafIcon: {
    display: 'none',
  },
});

export default NavigationBar;
