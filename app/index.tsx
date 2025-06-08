import { Text, View } from "react-native";
import NavigationBar from "../components/NavigationBar";

export default function Index() {
  const handleTabPress = (tabName: string) => {
    console.log(`Tab pressed: ${tabName}`);
  };

  return (
    <View
      style={{
        flex: 1,
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
      <NavigationBar onTabPress={handleTabPress} />
    </View>
  );
}
