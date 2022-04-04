import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from "./assets/warehouse.jpg";
import Stock from "./components/Stock";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.base}>
        <Text style={{fontSize: 42, color: "#fff"}}>Lager app</Text>
        <Image source={warehouse} style={{width:320, height: 240}}></Image>
        <Stock></Stock>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#333',
    color: "#fff",
    padding: 50
  },
});
