import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import IAuth from "../../interfaces/auth";
import authModel from '../../models/auth';
import AuthFields from './AuthFields';


interface props {
  navigation: any,
  setIsLoggedIn: CallableFunction
}

export default function Login({navigation, setIsLoggedIn}: props) {
  const [auth, setAuth] = useState<Partial<IAuth>>({});
  async function doLogin() {
    if (auth.password && auth.email) {
      const result = await authModel.login(auth.email, auth.password);
      if(!result) {
        Alert.alert("Fel", "Fel användarnamn eller lösenord")
      }
      setIsLoggedIn(result);
    } else {
      Alert.alert("Ange email och lösenord", "Ange email och lösenord");
    }
  }
  return (
    <AuthFields auth={auth} setAuth={setAuth} submit={doLogin} title="Logga in" navigation={navigation}>
    </AuthFields>
  )
}