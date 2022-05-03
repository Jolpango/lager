import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import IAuth from '../../interfaces/auth'
import TextHeading from '../TextComponents/TextHeading'
import TextSubHeading from '../TextComponents/TextSubHeading'
import { Colors } from '../../styles'
import authModel from "../../models/auth";
import { showMessage } from 'react-native-flash-message'

interface props {
  auth: Partial<IAuth>,
  setAuth: CallableFunction,
  submit: CallableFunction,
  title: string,
  navigation: any
}

export default function AuthFields({auth, setAuth, title, submit, navigation}: props) {
  const [passwordBorderColor, setPasswordBorderColor] = useState("#333");
  const [emailBorderColor, setEmailBorderColor] = useState("#333");

  return (
    <ScrollView style={{padding:15, ...Colors.darkBackgroundColor}}>
      <TextHeading>{title}</TextHeading>
      <TextSubHeading>Email</TextSubHeading>
      <TextInput
        autoCapitalize="none"
        style={{...styles.textInput, borderColor: emailBorderColor}}
        onChangeText={(content: string) => {
          if (title === "Registrera") {
            if (!authModel.isValidEmail(content)) {
              setEmailBorderColor("red");
              showMessage({
                message: "Email",
                description: "Ej giltig email address",
                type: "warning"
              })
            } else {
              setEmailBorderColor("green");
              showMessage({
                message: "Email",
                description: "Giltig email address",
                type: "success"
              })
            }
          }
          setAuth({...auth, email: content});
        }}
        value={auth?.email}
        keyboardType="email-address"
        autoCompleteType="email"
      />
      <TextSubHeading>Lösenord</TextSubHeading>
      <TextInput
      autoCapitalize="none"
      autoCompleteType="password"
        style={{...styles.textInput, borderColor: passwordBorderColor}}
        onChangeText={(content: string) => {
          if (title === "Registrera") {
            if (!authModel.isValidPassword(content)) {
              setPasswordBorderColor("red");
              showMessage({
                message: "Ej giltigt lösenord",
                description: "Lösenordet måste vara minst 8 karaktärer och innehålla minst en liten bokstav, en stor, en siffra och ett specialtecken",
                type: "warning"
              })
            } else {
              setPasswordBorderColor("green")
              showMessage({
                message: "Lösenord",
                description: "Det här lösenordet är tillräckligt starkt",
                type: "success"
              })
            }
          }
          setAuth({...auth, password: content});
        }}
        value={auth?.password}
        secureTextEntry={true}
      />
      <Button
        title={title}
        color={Colors.primaryAccentColor.backgroundColor}
        onPress={() => {
          submit();
        }}
      />
      {title === "Logga in" &&
        <View style={{marginTop: 20}}>
          <Button
            title="Registrera"
            color={Colors.primaryAccentColor.backgroundColor}
            onPress={() => {
              navigation.navigate("Registrera");
            }}
          />
        </View>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#555",
    fontSize: 20, color:"#fff",
    backgroundColor:"#333",
    padding:10,
    marginBottom:30
  }
});
