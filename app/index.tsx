import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import NavigationBar from "../components/NavigationBar";

export default function Index() {
  const handleTabPress = (tabName: string) => {
    switch (tabName) {
      case 'Home':
        // Already on Home
        break;
      case 'Favorites':
        router.push('/favorites');
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
    <View
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
      
      {/* Profil Kartı */}
      <View style={styles.profileCard}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={require('../assets/images/olaf.png')}
            style={styles.profileImage}
          />
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <Text style={styles.statText}>Oluşturulan Kartlar: 97</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statText}>Kaydedilenler: 19</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statText}>Çok Beğenilenler: 11</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statText}>Ardışık Gün Serisi: 7</Text>
          </View>
        </View>
      </View>
      
      <NavigationBar onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 48,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImageContainer: {
    marginRight: 24,
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
  },
  statsContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 100,
  },
  statRow: {
    marginBottom: 6,
    justifyContent: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
});
