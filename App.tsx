import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import warehouse from "./assets/warehouse.jpg";
import Stock from "./components/Stock";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>
        <Text style={{fontSize: 42}}>Lager app</Text>
        <Image source={warehouse} style={{width:320, height: 240}}></Image>
        <Stock></Stock>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  base: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
