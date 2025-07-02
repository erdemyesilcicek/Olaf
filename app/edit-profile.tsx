import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { profileViewModel, ProfileViewModelState } from '../viewmodels/ProfileViewModel';

export default function EditProfile() {
  const [vmState, setVmState] = useState<ProfileViewModelState>(profileViewModel.getState());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isZodiacModalVisible, setIsZodiacModalVisible] = useState(false);

  // 6 adet avatar seçeneği
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

  // Component mount olduğunda ViewModel'i dinle ve profil bilgilerini yükle
  useEffect(() => {
    // ViewModel state'ini dinle
    const handleStateChange = (state: ProfileViewModelState) => {
      setVmState(state);
    };

    profileViewModel.addListener(handleStateChange);
    profileViewModel.loadSavedProfile();

    // Cleanup
    return () => {
      profileViewModel.removeListener(handleStateChange);
    };
  }, []);

  const openModal = () => {
    profileViewModel.setTempSelectedAvatar(vmState.selectedAvatar);
    setIsModalVisible(true);
  };

  const selectAvatar = (index: number) => {
    profileViewModel.setTempSelectedAvatar(index);
  };

  const handleAgeChange = (text: string) => {
    profileViewModel.setUserAge(text);
  };

  const openGenderModal = () => {
    setIsGenderModalVisible(true);
  };

  const selectGender = (gender: string) => {
    profileViewModel.setUserGender(gender);
    setIsGenderModalVisible(false);
  };

  const openZodiacModal = () => {
    setIsZodiacModalVisible(true);
  };

  const selectZodiac = (zodiac: string) => {
    profileViewModel.setUserZodiac(zodiac);
    setIsZodiacModalVisible(false);
  };

  const saveProfile = async () => {
    const result = await profileViewModel.saveProfile();
    if (result.success) {
      Alert.alert('Başarılı', result.message);
    } else {
      Alert.alert('Hata', result.message);
    }
  };

  const saveAvatar = async () => {
    const result = await profileViewModel.saveAvatar();
    setIsModalVisible(false);
    if (result.success) {
      Alert.alert('Başarılı', result.message);
    } else {
      Alert.alert('Hata', result.message);
    }
  };

  const renderAvatarItem = ({ item, index }: { item: any; index: number }) => {
    const isSelected = vmState.tempSelectedAvatar === index;
    
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
      {/* Content ScrollView */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarContainer} onPress={openModal}>
            <Image 
              source={avatarOptions[vmState.selectedAvatar]} 
              style={styles.avatar}
              resizeMode="cover"
            />
            <View style={styles.editBadge}>
              <Icon name="camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.avatarLabel}>Profil Fotoğrafı</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Display Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Ad Soyad</Text>
            <View style={styles.inputContainer}>
              <Icon name="user" size={18} color="#6B73FF" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Adınızı ve soyadınızı girin"
                value={vmState.userDisplayName}
                onChangeText={profileViewModel.setUserDisplayName.bind(profileViewModel)}
                placeholderTextColor="#A0A0A0"
                maxLength={50}
              />
            </View>
          </View>

          {/* Username */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
            <View style={styles.inputContainer}>
              <Icon name="at-sign" size={18} color="#6B73FF" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Kullanıcı adınızı girin"
                value={vmState.userName}
                onChangeText={profileViewModel.setUserName.bind(profileViewModel)}
                placeholderTextColor="#A0A0A0"
                maxLength={20}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>E-posta</Text>
            <View style={styles.inputContainer}>
              <Icon name="mail" size={18} color="#6B73FF" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="E-posta adresinizi girin"
                value={vmState.userEmail}
                onChangeText={profileViewModel.setUserEmail.bind(profileViewModel)}
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                maxLength={100}
              />
            </View>
          </View>

          {/* Age */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Yaş</Text>
            <View style={styles.inputContainer}>
              <Icon name="calendar" size={18} color="#6B73FF" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Yaşınızı girin"
                value={vmState.userAge}
                onChangeText={handleAgeChange}
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
          </View>

          {/* Gender Selector */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cinsiyet</Text>
            <TouchableOpacity style={styles.selectorContainer} onPress={openGenderModal}>
              <Icon name="users" size={18} color="#6B73FF" style={styles.inputIcon} />
              <Text style={[styles.selectorText, !vmState.userGender && styles.placeholderText]}>
                {vmState.userGender || 'Cinsiyetinizi seçin'}
              </Text>
              <Icon name="chevron-down" size={18} color="#A0A0A0" />
            </TouchableOpacity>
          </View>

          {/* Zodiac Selector */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Burç</Text>
            <TouchableOpacity style={styles.selectorContainer} onPress={openZodiacModal}>
              <Icon name="star" size={18} color="#6B73FF" style={styles.inputIcon} />
              <Text style={[styles.selectorText, !vmState.userZodiac && styles.placeholderText]}>
                {vmState.userZodiac || 'Burcunuzu seçin'}
              </Text>
              <Icon name="chevron-down" size={18} color="#A0A0A0" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Icon name="check" size={20} color="#fff" style={styles.saveButtonIcon} />
          <Text style={styles.saveButtonText}>Değişiklikleri Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>

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
            
            <View style={styles.genderGrid}>
              {genderOptions.map((gender, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.genderOption}
                  onPress={() => selectGender(gender)}
                >
                  <Text style={styles.genderOptionText}>{gender}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#6B73FF',
    padding: 8,
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
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#6B73FF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  avatarLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  formSection: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 12,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  selectorText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  saveButton: {
    backgroundColor: '#6B73FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 40,
    shadowColor: '#6B73FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonIcon: {
    marginRight: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
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
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
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
    backgroundColor: '#F0F4FF',
    borderRadius: 12,
  },
  avatarOptionImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f9fa',
    padding: 6,
  },
  checkMark: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#6B73FF',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  checkMarkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  cancelButtonText: {
    color: '#6B7280',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
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
  genderModalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    width: '85%',
    maxHeight: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  genderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  genderOption: {
    width: '30%',
    paddingVertical: 16,
    paddingHorizontal: 6,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 50,
    justifyContent: 'center',
  },
  genderOptionText: {
    fontSize: 16,
    color: '#1F2937',
    textAlign: 'center',
    fontWeight: '600',
  },
  genderCancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  genderCancelButtonText: {
    color: '#6B7280',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
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
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  zodiacGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  zodiacOption: {
    width: '30%',
    paddingVertical: 16,
    paddingHorizontal: 6,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 50,
    justifyContent: 'center',
  },
  zodiacOptionText: {
    fontSize: 16,
    color: '#1F2937',
    textAlign: 'center',
    fontWeight: '600',
  },
  zodiacCancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  zodiacCancelButtonText: {
    color: '#6B7280',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
