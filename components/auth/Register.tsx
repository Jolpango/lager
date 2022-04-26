import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import IAuth from '../../interfaces/auth'
import authModel from '../../models/auth';
import AuthFields from './AuthFields';

interface props {
  navigation: any
}

export default function Register({ navigation }: props) {
  const [auth, setAuth] = useState<Partial<IAuth>>({});
  async function doRegister() {
    if (auth.email && auth.password) {
      const result = await authModel.register(auth.email, auth.password);
      Alert.alert("Registrering", result.data.message, [
        {text: "OK", onPress: () => { navigation.navigate("Login") }}
      ],
      {cancelable: false});
    }
  }
  return (
    <AuthFields auth={auth} setAuth={setAuth} submit={doRegister} title="Registrera" navigation={navigation}>
    </AuthFields>
  )
}