import { StyleSheet, Text, View } from "react-native";

export default function Favorites() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emptyText}>
          Favori kartlarınız burada görünecek
        </Text>
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
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
