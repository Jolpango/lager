import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Login";
import Register from "./Register";

interface props {
  setIsLoggedIn: CallableFunction
}

const Stack = createNativeStackNavigator();

export default function Auth({setIsLoggedIn}: props) {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Logga in">
        {(screenProps) => <Login {...screenProps} setIsLoggedIn={setIsLoggedIn}></Login>}
      </Stack.Screen>
      <Stack.Screen name="Registrera" component={Register}></Stack.Screen>
    </Stack.Navigator>
  )
}