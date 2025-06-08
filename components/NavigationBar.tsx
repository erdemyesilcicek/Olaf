import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NavigationBarProps {
  onTabPress?: (tabName: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onTabPress }) => {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: '🏠' },
    { name: 'Favorites', icon: '❤️' },
    { name: 'CREATE', icon: '➕' },
    { name: 'History', icon: '📋' },
    { name: 'Profile', icon: '👤' }
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
            tab.name === 'CREATE' && styles.createTab,
            activeTab === tab.name && styles.activeTab
          ]}
          onPress={() => handleTabPress(tab.name)}
        >
          <Text style={[
            styles.icon,
            tab.name === 'CREATE' && styles.createIcon,
            activeTab === tab.name && styles.activeIcon
          ]}>
            {tab.icon}
          </Text>
          <Text style={[
            styles.label,
            tab.name === 'CREATE' && styles.createLabel,
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
    borderTopColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  createTab: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    marginHorizontal: 8,
    paddingVertical: 12,
  },
  activeTab: {
    // Additional styling for active state
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  createIcon: {
    color: '#ffffff',
    fontSize: 24,
  },
  activeIcon: {
    // Active icon styling
  },
  label: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '500',
  },
  createLabel: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  activeLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default NavigationBar;
