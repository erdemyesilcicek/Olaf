import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface NavigationBarProps {
  onTabPress?: (tabName: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onTabPress }) => {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: 'home' },
    { name: 'Favorites', icon: 'heart' },
    { name: 'Create', icon: 'plus' },
    { name: 'History', icon: 'clock' },
    { name: 'Profile', icon: 'user' }
  ];

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    onTabPress && onTabPress(tabName);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={[
            styles.tab,
            activeTab === tab.name && styles.activeTab
          ]}
          onPress={() => handleTabPress(tab.name)}
        >
          {tab.name === 'Create' ? (
            <Image 
              source={require('../assets/images/olaf.png')}
              style={[
                styles.olafIcon,
                {
                  tintColor: activeTab === tab.name 
                    ? '#6B73FF' 
                    : '#9CA3AF'
                }
              ]}
            />
          ) : (
            <Icon 
              name={tab.icon}
              size={20}
              color={
                activeTab === tab.name 
                  ? '#6B73FF' 
                  : '#9CA3AF'
              }
            />
          )}
          <Text style={[
            styles.label,
            activeTab === tab.name && styles.activeLabel
          ]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 85,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    transform: [{ scale: 1.05 }],
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  activeIcon: {
    color: '#6B73FF',
  },
  olafIcon: {
    width: 20,
    height: 20,
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
    marginTop: 4,
  },
  activeLabel: {
    color: '#6B73FF',
    fontWeight: '600',
  },
});

export default NavigationBar;
