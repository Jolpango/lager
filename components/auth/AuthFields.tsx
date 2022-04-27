import { View, TextInput, Button, StyleSheet } from 'react-native'
import React from 'react'
import IAuth from '../../interfaces/auth'
import TextHeading from '../TextComponents/TextHeading'
import TextSubHeading from '../TextComponents/TextSubHeading'
import { Colors } from '../../styles'

interface props {
  auth: Partial<IAuth>,
  setAuth: CallableFunction,
  submit: CallableFunction,
  title: string,
  navigation: any
}

export default function AuthFields({auth, setAuth, title, submit, navigation}: props) {
  return (
    <View style={{padding:15}}>
      <TextHeading>{title}</TextHeading>
      <TextSubHeading>Email</TextSubHeading>
      <TextInput
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={(content: string) => {
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
        style={styles.textInput}
        onChangeText={(content: string) => {
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
              navigation.navigate("Register");
            }}
          />
        </View>
      }
    </View>
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
