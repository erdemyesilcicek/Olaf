import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NavigationBar from "../components/NavigationBar";

export default function Index() {
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  // Avatar options matching the profile page
  const avatarOptions = [
    require('../assets/images/olaf.png'),
    require('../assets/images/dog.png'),
    require('../assets/images/cat.png'),
    require('../assets/images/horse.png'),
    require('../assets/images/elephant.png'),
    require('../assets/images/tiger.png'),
  ];

  // Load saved avatar on component mount
  useEffect(() => {
    loadSavedAvatar();
  }, []);

  // Reload avatar when screen comes into focus (e.g., returning from Profile page)
  useFocusEffect(
    useCallback(() => {
      loadSavedAvatar();
    }, [])
  );

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

  // 50 motivasyon sözü listesi
  const motivationQuotes = [
    { text: "Başarı, küçük çabaların her gün tekrarlanmasıdır.", author: "Robert Collier" },
    { text: "Hayatta en büyük zafer, hiç düşmemek değil, her düştüğünde ayağa kalkmaktır.", author: "Nelson Mandela" },
    { text: "Yarın bugünden başlar.", author: "Anonim" },
    { text: "Bir hedefiniz varsa, onu gerçekleştirmek için hiçbir zaman çok geç değildir.", author: "C.S. Lewis" },
    { text: "Başarı yolunda en büyük engel, başlamamaktır.", author: "Anonim" },
    { text: "Hayallerinizi gerçekleştirmenin tek yolu, uyanmaktır.", author: "Paulo Coelho" },
    { text: "İyi bir planla yavaş hareket etmek, plansız hızlı hareket etmekten iyidir.", author: "Benjamin Franklin" },
    { text: "Bugün kendini geliştirmen, yarının sana vereceği en büyük hediyedir.", author: "Anonim" },
    { text: "Zor günler seni güçlü yapar. Güçlü günler seni efsane yapar.", author: "Anonim" },
    { text: "Değişim acı verebilir, ama değişmemek daha da acı verir.", author: "Anonim" },
    { text: "Başarı, hazırlık ile fırsatın buluşmasıdır.", author: "Seneca" },
    { text: "Kendinize inanın. Zaten sahip olduğunuz her şeye sahipsiniz.", author: "Anonim" },
    { text: "En karanlık gecenin bile sabahı vardır.", author: "Anonim" },
    { text: "Büyük işler, büyük riskler gerektirir.", author: "Heraklit" },
    { text: "Hedefiniz net değilse, hedefinize ulaşamazsınız.", author: "Anonim" },
    { text: "Başarı, tutku ile çalışmanın sonucudur.", author: "Wayne Huizenga" },
    { text: "Bugün yaptığın küçük adımlar, yarının büyük başarılarıdır.", author: "Anonim" },
    { text: "Mükemmel zaman diye bir şey yoktur. Şimdi en iyi zamandır.", author: "Anonim" },
    { text: "Kendi limitlerini sen belirlersin.", author: "Anonim" },
    { text: "İmkansız sadece bir görüştür.", author: "Paulo Coelho" },
    { text: "Başarısızlık, başarıya giden yolun bir parçasıdır.", author: "Anonim" },
    { text: "Cesaret, korkunun karşısında durmaktır.", author: "Anonim" },
    { text: "Küçük adımlar büyük yolculukları tamamlar.", author: "Lao Tzu" },
    { text: "Kendine güven, başarının anahtarıdır.", author: "Anonim" },
    { text: "Hayal kurmayan hiçbir şey yaratamaz.", author: "George Bernard Shaw" },
    { text: "Bugün daha iyi olmaya odaklan.", author: "Anonim" },
    { text: "Zorluklar, gücümüzü keşfetmemizi sağlar.", author: "Anonim" },
    { text: "Başla. Mükemmel olmak zorunda değilsin.", author: "Anonim" },
    { text: "Her gün yeni bir şans, yeni bir başlangıçtır.", author: "Anonim" },
    { text: "Sabır, en güçlü silahtır.", author: "Anonim" },
    { text: "Başarı yolunda vazgeçmek yok.", author: "Anonim" },
    { text: "Pozitif düşün, pozitif şeyler olacak.", author: "Anonim" },
    { text: "Bugün kendine yatırım yap.", author: "Anonim" },
    { text: "Küçük değişimler büyük sonuçlar yaratır.", author: "Anonim" },
    { text: "İnanç dağları yerinden oynatır.", author: "Anonim" },
    { text: "Her hata, öğrenme fırsatıdır.", author: "Anonim" },
    { text: "Başarı, kararlılığın ödülüdür.", author: "Anonim" },
    { text: "İyi şeyler sabırlı olana gelir.", author: "Anonim" },
    { text: "Kendini sev, kendine güven.", author: "Anonim" },
    { text: "Bugün attığın adım, yarının temelini atar.", author: "Anonim" },
    { text: "Zorluklarla mücadele etmek seni güçlendirir.", author: "Anonim" },
    { text: "Başarı, disiplinin ürünüdür.", author: "Anonim" },
    { text: "Hayallerinin peşinden koş.", author: "Anonim" },
    { text: "Kendine verdiğin sözü tut.", author: "Anonim" },
    { text: "İlerlemek için geçmişi geride bırak.", author: "Anonim" },
    { text: "Motive ol, harekete geç.", author: "Anonim" },
    { text: "Bugün dünden daha iyi ol.", author: "Anonim" },
    { text: "Zafer, pes etmeyenlerindir.", author: "Anonim" },
    { text: "Geleceğin bugün aldığın kararlarla şekillenir.", author: "Anonim" },
    { text: "Başarı yolunda tek başına değilsin.", author: "Anonim" }
  ];

  // Günün sözünü al (gün bazında değişen)
  const getTodayQuote = () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % motivationQuotes.length;
    return motivationQuotes[quoteIndex];
  };

  const todayQuote = getTodayQuote();

  const recentCards = [
    { id: 1, title: 'Başarı Kartı', subtitle: 'Hedeflerine ulaşmanın sırrı', category: 'Motivasyon' },
    { id: 2, title: 'Öğrenme Notları', subtitle: 'Bilginin gücünü keşfet', category: 'Eğitim' },
    { id: 3, title: 'Günlük Hedefler', subtitle: 'Adım adım başarıya', category: 'İş' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Merhaba! 👋</Text>
          <Text style={styles.dateText}>8 Haziran 2025, Pazartesi</Text>
          <Text style={styles.questionText}>Bugün hangi kartı oluşturacaksın?</Text>
        </View>

        {/* Günlük Motivasyon */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Günün Sözü</Text>
          <View style={styles.motivationCard}>
            <Text style={styles.motivationIcon}>✨</Text>
            <Text style={styles.motivationText}>
              "{todayQuote.text}"
            </Text>
            <Text style={styles.motivationAuthor}>- {todayQuote.author}</Text>
          </View>
        </View>

        {/* Son Kartlar */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Son Kartların</Text>
            <TouchableOpacity onPress={() => router.push('/favorites?tab=clock')}>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScroll}>
            {recentCards.map((card) => (
              <TouchableOpacity key={card.id} style={styles.cardPreview}>
                <View style={styles.cardImageContainer}>
                  <Image 
                    source={require('../assets/images/olaf.png')}
                    style={styles.cardImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardPreviewContent}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* İstatistik Kartı */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>İstatistiklerim</Text>
          <View style={styles.profileCard}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={avatarOptions[selectedAvatar]}
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
                <Text style={styles.statText}>Ardışık Gün Serisi: 7 🔥</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      
      <NavigationBar onTabPress={handleTabPress} />
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  cardsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  cardPreview: {
    width: 140,
    height: 180,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    alignItems: 'center',
  },
  cardImageContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 6,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardImage: {
    width: 90,
    height: 90,
  },
  cardPreviewContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 16,
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 4,
  },
  motivationCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  motivationIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  motivationText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 24,
  },
  motivationAuthor: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  profileImageContainer: {
    marginRight: 20,
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 50,
    padding: 8,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F3F4F6',
  },
  statsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  statRow: {
    marginBottom: 6,
  },
  statText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
});
