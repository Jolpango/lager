import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import IAuth from '../../interfaces/auth'
import authModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from 'react-native-flash-message';

interface props {
  navigation: any
}

export default function Register({ navigation }: props) {
  const [auth, setAuth] = useState<Partial<IAuth>>({});
  async function doRegister() {
    if (auth.email && auth.password) {
      const result = await authModel.register(auth.email, auth.password);
      showMessage(result);
      if(result.type === "success") {
        navigation.navigate("Logga in")
      }
    }
  }
  return (
    <AuthFields auth={auth} setAuth={setAuth} submit={doRegister} title="Registrera" navigation={navigation} />
  )
}