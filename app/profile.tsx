import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import NavigationBar from "../components/NavigationBar";

export default function Profile() {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempSelectedAvatar, setTempSelectedAvatar] = useState(0);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userZodiac, setUserZodiac] = useState('');
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isZodiacModalVisible, setIsZodiacModalVisible] = useState(false);

  // 9 adet avatar seçeneği (şimdilik hepsi Olaf)
  const avatarOptions = [
    require('../assets/images/olaf.png'),
    require('../assets/images/dog.png'),
    require('../assets/images/cat.png'),
    require('../assets/images/horse.png'),
    require('../assets/images/elephant.png'),
    require('../assets/images/tiger.png'),
  ];

  // Cinsiyet seçenekleri
  const genderOptions = ['Erkek', 'Kadın', 'Diğer'];

  // Burç seçenekleri
  const zodiacOptions = [
    'Koç', 'Boğa', 'İkizler', 'Yengeç', 'Aslan', 'Başak',
    'Terazi', 'Akrep', 'Yay', 'Oğlak', 'Kova', 'Balık'
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

  const handleAgeChange = (text: string) => {
    // Sadece sayısal karakterlere izin ver
    const numericValue = text.replace(/[^0-9]/g, '');
    
    // Başındaki sıfırları kaldır (tek 0 hariç)
    const trimmedValue = numericValue.replace(/^0+/, '') || (numericValue === '0' ? '0' : '');
    
    setUserAge(trimmedValue);
  };

  const openGenderModal = () => {
    setIsGenderModalVisible(true);
  };

  const selectGender = (gender: string) => {
    setUserGender(gender);
    setIsGenderModalVisible(false);
  };

  const openZodiacModal = () => {
    setIsZodiacModalVisible(true);
  };

  const selectZodiac = (zodiac: string) => {
    setUserZodiac(zodiac);
    setIsZodiacModalVisible(false);
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
        activeOpacity={1}
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

        {/* İsim Input */}
        <TextInput
          style={styles.nameInput}
          placeholder="İsminizi girin"
          value={userName}
          onChangeText={setUserName}
          placeholderTextColor="#999"
          maxLength={30}
        />

        {/* Yaş Input */}
        <TextInput
          style={styles.ageInput}
          placeholder="Yaşınızı girin"
          value={userAge}
          onChangeText={handleAgeChange}
          placeholderTextColor="#999"
          keyboardType="numeric"
          maxLength={2}
        />

        {/* Cinsiyet Dropdown */}
        <TouchableOpacity style={styles.genderDropdown} onPress={openGenderModal}>
          <Text style={[styles.genderText, !userGender && styles.placeholderText]}>
            {userGender || 'Cinsiyetinizi seçin'}
          </Text>
        </TouchableOpacity>

        {/* Burç Dropdown */}
        <TouchableOpacity style={styles.zodiacDropdown} onPress={openZodiacModal}>
          <Text style={[styles.zodiacText, !userZodiac && styles.placeholderText]}>
            {userZodiac || 'Burcunuzu seçin'}
          </Text>
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

      {/* Cinsiyet Seçim Modal */}
      <Modal
        visible={isGenderModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsGenderModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.genderModalContent}>
            <Text style={styles.modalTitle}>Cinsiyet Seçin</Text>
            
            {genderOptions.map((gender, index) => (
              <TouchableOpacity
                key={index}
                style={styles.genderOption}
                onPress={() => selectGender(gender)}
              >
                <Text style={styles.genderOptionText}>{gender}</Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={styles.genderCancelButton}
              onPress={() => setIsGenderModalVisible(false)}
            >
              <Text style={styles.genderCancelButtonText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Burç Seçim Modal */}
      <Modal
        visible={isZodiacModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsZodiacModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.zodiacModalContent}>
            <Text style={styles.modalTitle}>Burç Seçin</Text>
            
            <View style={styles.zodiacGrid}>
              {zodiacOptions.map((zodiac, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.zodiacOption}
                  onPress={() => selectZodiac(zodiac)}
                >
                  <Text style={styles.zodiacOptionText}>{zodiac}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.zodiacCancelButton}
              onPress={() => setIsZodiacModalVisible(false)}
            >
              <Text style={styles.zodiacCancelButtonText}>İptal</Text>
            </TouchableOpacity>
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
  nameInput: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ageInput: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  genderDropdown: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
  },
  genderModalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxHeight: '60%',
  },
  genderOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  genderOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  genderCancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  genderCancelButtonText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  zodiacDropdown: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  zodiacText: {
    fontSize: 16,
    color: '#333',
  },
  zodiacModalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    width: '92%',
    maxHeight: '75%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  zodiacGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  zodiacOption: {
    width: '30%',
    paddingVertical: 14,
    paddingHorizontal: 6,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    minHeight: 45,
    justifyContent: 'center',
  },
  zodiacOptionText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  zodiacCancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  zodiacCancelButtonText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});
