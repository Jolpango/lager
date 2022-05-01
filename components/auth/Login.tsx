import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import IAuth from "../../interfaces/auth";
import authModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from 'react-native-flash-message';


interface props {
  navigation: any,
  setIsLoggedIn: CallableFunction
}

export default function Login({navigation, setIsLoggedIn}: props) {
  const [auth, setAuth] = useState<Partial<IAuth>>({});
  async function doLogin() {
    if (auth.password && auth.email) {
      const result = await authModel.login(auth.email, auth.password);
      if (result.type === "success") {
        setIsLoggedIn(true);
      }
      showMessage(result);
    } else {
      showMessage({
        message: "Saknas",
        description: "Email och/eller lösenord saknas",
        type: "warning"
      });
    }
  }
  return (
    <AuthFields auth={auth} setAuth={setAuth} submit={doLogin} title="Logga in" navigation={navigation}/>
  )
}