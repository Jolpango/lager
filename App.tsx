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

const Tab = createBottomTabNavigator();

interface IStringByString {
  [key: string]: string;
}
const iconNames: IStringByString = {
  "Lager": "home",
  "Plock": "list"
}

export default function App() {
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
          <Tab.Screen name="Lager" component={Home} />
          <Tab.Screen name="Plock" component={Pick} />
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
