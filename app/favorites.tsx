import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NavigationBar from "../components/NavigationBar";

export default function Favorites() {
  const [activeTab, setActiveTab] = useState('bookmark');

  const handleTabPress = (tabName: string) => {
    switch (tabName) {
      case 'Home':
        router.push('/');
        break;
      case 'Favorites':
        // Already on Favorites
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
    <View style={styles.container}>
      {/* Tab Card */}
      <View style={styles.tabCard}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'bookmark' && styles.activeTab]}
          onPress={() => setActiveTab('bookmark')}
          activeOpacity={1}
        >
          <Ionicons 
            name="bookmark" 
            size={24} 
            color={activeTab === 'bookmark' ? '#007AFF' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'bookmark' && styles.activeTabText]}>
            Favoriler
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'clock' && styles.activeTab]}
          onPress={() => setActiveTab('clock')}
          activeOpacity={1}
        >
          <Ionicons 
            name="time" 
            size={24} 
            color={activeTab === 'clock' ? '#007AFF' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'clock' && styles.activeTabText]}>
            Geçmiş
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {activeTab === 'bookmark' ? 'Favoriler' : 'Geçmiş'}
        </Text>
        <Text style={styles.subtitle}>
          {activeTab === 'bookmark' 
            ? 'Favori kartlarınız burada görünecek' 
            : 'Geçmişte oluşturulan kartlar burada görünecek'
          }
        </Text>
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
  tabCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  activeTab: {
    backgroundColor: '#f0f8ff',
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
