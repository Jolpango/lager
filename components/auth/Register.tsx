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
    if (auth.email && auth.password && authModel.isValidEmail(auth.email) && authModel.isValidPassword(auth.password)) {
      const result = await authModel.register(auth.email, auth.password);
      showMessage(result);
      if(result.type === "success") {
        navigation.navigate("Logga in")
      }
    } else {
      showMessage({
        message: "Fel vid registrering",
        description: "Ange en riktig email och ett starkt lösenord",
        type: "danger"
      })
    }
  }
  return (
    <AuthFields auth={auth} setAuth={setAuth} submit={doRegister} title="Registrera" navigation={navigation} />
  )
}