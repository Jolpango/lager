import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import {  StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flex, Colors } from './styles/index';
import Home from "./components/Home";
import Pick from "./components/Pick";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { IProduct } from './interfaces/products';
import productModel from './models/product';
const Tab = createBottomTabNavigator();

interface IStringByString {
  [key: string]: string;
}

const iconNames: IStringByString = {
  "Lager": "home",
  "Plock": "list"
}

export default function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const refreshInventory = async () => {
    const p = await productModel.getProducts();
    setProducts(p);
  }
  useEffect(() => {
    refreshInventory();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={DarkTheme as any}>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = iconNames[route.name] || "alert";
            return <Ionicons name={iconName as any} size={size} color={color}></Ionicons>
          },
          tabBarActiveTintColor: Colors.primaryAccentColor.backgroundColor,
          tabBarInactiveTintColor: Colors.lightFontColor.color,
          tabBarActiveBackgroundColor: Colors.darkBackgroundColor.backgroundColor,
          tabBarInactiveBackgroundColor: Colors.darkBackgroundColor.backgroundColor,
          tabBarStyle: styles.navigation
        })}>
          <Tab.Screen name="Lager" children={ () => <Home refreshInventory={refreshInventory} products={products}/> } />
          <Tab.Screen name="Plock" children={ () => <Pick refreshInventory={refreshInventory}/> } />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto"></StatusBar>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    ...Flex.flex,
    ...Colors.darkBackgroundColor
  },
  navigation: {
    ...Colors.lightFontColor,
    ...Colors.darkBackgroundColor
  }
});
