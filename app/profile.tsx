import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NavigationBar from "../components/NavigationBar";

export default function Profile() {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempSelectedAvatar, setTempSelectedAvatar] = useState(0);

  // 9 adet avatar seçeneği (şimdilik hepsi Olaf)
  const avatarOptions = [
    require('../assets/images/olaf.png'),
    require('../assets/images/dog.png'),
    require('../assets/images/cat.png'),
    require('../assets/images/horse.png'),
    require('../assets/images/elephant.png'),
    require('../assets/images/tiger.png'),
  ];

  // Kaydedilmiş avatar'ı yükle
  useEffect(() => {
    loadSavedAvatar();
  }, []);

  const loadSavedAvatar = async () => {
    try {
      if (Platform.OS !== 'web') {
        const savedAvatar = await AsyncStorage.getItem('selectedAvatar');
        if (savedAvatar !== null) {
          setSelectedAvatar(parseInt(savedAvatar));
        }
      }
    } catch (error) {
      console.log('Avatar yüklenirken hata oluştu:', error);
    }
  };

  const handleTabPress = (tabName: string) => {
    switch (tabName) {
      case 'Home':
        router.push('/');
        break;
      case 'Favorites':
        router.push('/favorites');
        break;
      case 'Create':
        router.push('/create');
        break;
      case 'Profile':
        // Already on Profile
        break;
    }
  };

  const openModal = () => {
    setTempSelectedAvatar(selectedAvatar);
    setIsModalVisible(true);
  };

  const selectAvatar = (index: number) => {
    setTempSelectedAvatar(index);
  };

  const saveAvatar = async () => {
    try {
      setSelectedAvatar(tempSelectedAvatar);
      if (Platform.OS !== 'web') {
        await AsyncStorage.setItem('selectedAvatar', tempSelectedAvatar.toString());
      }
      setIsModalVisible(false);
      Alert.alert('Başarılı', 'Avatar kaydedildi!');
    } catch (error) {
      Alert.alert('Hata', 'Avatar kaydedilemedi');
    }
  };

  const renderAvatarItem = ({ item, index }: { item: any; index: number }) => {
    const isSelected = tempSelectedAvatar === index;
    
    return (
      <TouchableOpacity
        style={[
          styles.avatarOption,
          isSelected && styles.selectedAvatarOption
        ]}
        onPress={() => selectAvatar(index)}
        activeOpacity={0.7}
      >
        <Image 
          source={item} 
          style={styles.avatarOptionImage}
          resizeMode="cover"
        />
        {isSelected && (
          <View style={styles.checkMark}>
            <Text style={styles.checkMarkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>Profil ayarlarınız ve istatistikleriniz</Text>
        
        {/* Avatar */}
        <TouchableOpacity style={styles.avatarContainer} onPress={openModal}>
          <Image 
            source={avatarOptions[selectedAvatar]} 
            style={styles.avatar}
            resizeMode="cover"
          />
          <View style={styles.editBadge}>
            <Text style={styles.editBadgeText}>✏️</Text>
          </View>
        </TouchableOpacity>

        {/* Kaydet Butonu */}
        <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Profil Kaydedildi', 'Profil bilgileriniz başarıyla kaydedildi!')}>
          <Text style={styles.saveButtonText}>Profili Kaydet</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar Seçim Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Avatar Seç</Text>
            
            <FlatList
              data={avatarOptions}
              renderItem={renderAvatarItem}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              style={styles.avatarGrid}
              contentContainerStyle={styles.avatarGridContent}
              scrollEnabled={false}
              removeClippedSubviews={false}
              getItemLayout={(data, index) => ({
                length: 116, // 100 + 16 margin
                offset: Math.floor(index / 3) * 116,
                index,
              })}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]} 
                onPress={saveAvatar}
              >
                <Text style={styles.confirmButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <NavigationBar onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    marginBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    borderWidth: 3,
    borderColor: '#6B73FF',
    padding: 12,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6B73FF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  editBadgeText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6B73FF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    minHeight: 400,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatarGrid: {
    maxHeight: 300,
  },
  avatarGridContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarOption: {
    width: 100,
    height: 100,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  selectedAvatarOption: {
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
  },
  avatarOptionImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    padding: 6,
  },
  checkMark: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#6B73FF',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMarkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#6B73FF',
  },
  confirmButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
