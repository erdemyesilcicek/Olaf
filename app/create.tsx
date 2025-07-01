import { Image, StyleSheet, Text, View } from "react-native";

export default function Create() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Olaf'la Öğren</Text>
        <Text style={styles.subtitle}>Ruhunun derinliklerine dokun!</Text>
        
        <View style={styles.card}>
          <View style={styles.imageCard}>
            <Image 
              source={require('../assets/images/olaf.png')} 
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.cardTitle}>Kart Oluştur!</Text>
          <Text style={styles.cardSubtitle}>yeni bir kart oluşturmak için Olaf'a tıklayın!</Text>
        </View>
      </View>
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
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    width: '100%',
    minHeight: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 280,
    height: 280,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 18,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
});
