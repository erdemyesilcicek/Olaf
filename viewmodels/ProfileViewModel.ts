import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export interface UserProfile {
  selectedAvatar: number;
  userName: string;
  userDisplayName: string;
  userEmail: string;
  userAge: string;
  userGender: string;
  userZodiac: string;
}

export interface ProfileViewModelState extends UserProfile {
  isLoading: boolean;
  tempSelectedAvatar: number;
}

export class ProfileViewModel {
  private state: ProfileViewModelState = {
    selectedAvatar: 0,
    userName: '',
    userDisplayName: '',
    userEmail: '',
    userAge: '',
    userGender: '',
    userZodiac: '',
    isLoading: false,
    tempSelectedAvatar: 0,
  };

  private listeners: Array<(state: ProfileViewModelState) => void> = [];

  // State'i dinlemek için listener ekleme
  addListener(listener: (state: ProfileViewModelState) => void) {
    this.listeners.push(listener);
    listener(this.state); // İlk state'i hemen gönder
  }

  // Listener'ı kaldırma
  removeListener(listener: (state: ProfileViewModelState) => void) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  // State'i güncelleme ve listeners'ları bilgilendirme
  private updateState(newState: Partial<ProfileViewModelState>) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener(this.state));
  }

  // Getter methods
  getState(): ProfileViewModelState {
    return this.state;
  }

  // Avatar seçimi
  setSelectedAvatar(avatarIndex: number) {
    this.updateState({ selectedAvatar: avatarIndex });
  }

  setTempSelectedAvatar(avatarIndex: number) {
    this.updateState({ tempSelectedAvatar: avatarIndex });
  }

  // Form field updates
  setUserName(userName: string) {
    this.updateState({ userName });
  }

  setUserDisplayName(userDisplayName: string) {
    this.updateState({ userDisplayName });
  }

  setUserEmail(userEmail: string) {
    this.updateState({ userEmail });
  }

  setUserAge(userAge: string) {
    // Sadece sayısal karakterlere izin ver
    const numericValue = userAge.replace(/[^0-9]/g, '');
    
    // Başındaki sıfırları kaldır (tek 0 hariç)
    const trimmedValue = numericValue.replace(/^0+/, '') || (numericValue === '0' ? '0' : '');
    
    this.updateState({ userAge: trimmedValue });
  }

  setUserGender(userGender: string) {
    this.updateState({ userGender });
  }

  setUserZodiac(userZodiac: string) {
    this.updateState({ userZodiac });
  }

  // Avatar kaydetme
  async saveAvatar(): Promise<{ success: boolean; message: string }> {
    try {
      this.updateState({ isLoading: true });
      
      this.updateState({ selectedAvatar: this.state.tempSelectedAvatar });
      
      if (Platform.OS !== 'web') {
        await AsyncStorage.setItem('selectedAvatar', this.state.tempSelectedAvatar.toString());
      }
      
      this.updateState({ isLoading: false });
      return { success: true, message: 'Avatar kaydedildi!' };
    } catch (error) {
      this.updateState({ isLoading: false });
      console.log('Avatar kaydetme hatası:', error);
      return { success: false, message: 'Avatar kaydedilemedi' };
    }
  }

  // Profil bilgilerini kaydetme
  async saveProfile(): Promise<{ success: boolean; message: string }> {
    try {
      this.updateState({ isLoading: true });

      if (Platform.OS !== 'web') {
        await AsyncStorage.setItem('selectedAvatar', this.state.selectedAvatar.toString());
        await AsyncStorage.setItem('userName', this.state.userName);
        await AsyncStorage.setItem('userDisplayName', this.state.userDisplayName);
        await AsyncStorage.setItem('userEmail', this.state.userEmail);
        await AsyncStorage.setItem('userAge', this.state.userAge);
        await AsyncStorage.setItem('userGender', this.state.userGender);
        await AsyncStorage.setItem('userZodiac', this.state.userZodiac);
      }

      this.updateState({ isLoading: false });
      return { success: true, message: 'Profil bilgileriniz başarıyla kaydedildi!' };
    } catch (error) {
      this.updateState({ isLoading: false });
      console.log('Profil kaydetme hatası:', error);
      return { success: false, message: 'Profil bilgileri kaydedilemedi' };
    }
  }

  // Kaydedilmiş profil bilgilerini yükleme
  async loadSavedProfile(): Promise<void> {
    try {
      this.updateState({ isLoading: true });

      if (Platform.OS !== 'web') {
        const savedAvatar = await AsyncStorage.getItem('selectedAvatar');
        const savedName = await AsyncStorage.getItem('userName');
        const savedDisplayName = await AsyncStorage.getItem('userDisplayName');
        const savedEmail = await AsyncStorage.getItem('userEmail');
        const savedAge = await AsyncStorage.getItem('userAge');
        const savedGender = await AsyncStorage.getItem('userGender');
        const savedZodiac = await AsyncStorage.getItem('userZodiac');

        const updates: Partial<ProfileViewModelState> = {};

        if (savedAvatar !== null) {
          updates.selectedAvatar = parseInt(savedAvatar);
          updates.tempSelectedAvatar = parseInt(savedAvatar);
        }
        if (savedName !== null) {
          updates.userName = savedName;
        }
        if (savedDisplayName !== null) {
          updates.userDisplayName = savedDisplayName;
        }
        if (savedEmail !== null) {
          updates.userEmail = savedEmail;
        }
        if (savedAge !== null) {
          updates.userAge = savedAge;
        }
        if (savedGender !== null) {
          updates.userGender = savedGender;
        }
        if (savedZodiac !== null) {
          updates.userZodiac = savedZodiac;
        }

        this.updateState(updates);
      }

      this.updateState({ isLoading: false });
    } catch (error) {
      this.updateState({ isLoading: false });
      console.log('Profil bilgileri yüklenirken hata oluştu:', error);
    }
  }

  // Profil bilgilerini temizleme
  clearProfile() {
    this.updateState({
      selectedAvatar: 0,
      userName: '',
      userDisplayName: '',
      userEmail: '',
      userAge: '',
      userGender: '',
      userZodiac: '',
      tempSelectedAvatar: 0,
    });
  }

  // Validation methods
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidAge(age: string): boolean {
    const ageNum = parseInt(age);
    return !isNaN(ageNum) && ageNum > 0 && ageNum <= 120;
  }

  isProfileComplete(): boolean {
    return !!(
      this.state.userDisplayName.trim() &&
      this.state.userName.trim() &&
      this.state.userEmail.trim() &&
      this.state.userAge.trim() &&
      this.state.userGender &&
      this.state.userZodiac
    );
  }

  getValidationErrors(): string[] {
    const errors: string[] = [];

    if (!this.state.userDisplayName.trim()) {
      errors.push('Ad Soyad gereklidir');
    }

    if (!this.state.userName.trim()) {
      errors.push('Kullanıcı adı gereklidir');
    }

    if (!this.state.userEmail.trim()) {
      errors.push('E-posta gereklidir');
    } else if (!this.isValidEmail(this.state.userEmail)) {
      errors.push('Geçerli bir e-posta adresi giriniz');
    }

    if (!this.state.userAge.trim()) {
      errors.push('Yaş gereklidir');
    } else if (!this.isValidAge(this.state.userAge)) {
      errors.push('Geçerli bir yaş giriniz');
    }

    if (!this.state.userGender) {
      errors.push('Cinsiyet seçimi gereklidir');
    }

    if (!this.state.userZodiac) {
      errors.push('Burç seçimi gereklidir');
    }

    return errors;
  }
}

// Singleton instance
export const profileViewModel = new ProfileViewModel();
