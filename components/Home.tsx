import React from 'react-native';
import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import warehouse from "./../assets/warehouse.jpg";
import Stock from "./Stock";
import { Colors, Flex, Typography } from './../styles/index';

export default function Home() {
  return (
    <ScrollView style={styles.base}>
      <Text style={styles.heading}>Lager app</Text>
      <Image source={warehouse} style={{width:320, height: 240}}></Image>
      <Stock></Stock>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  base: {
    ...Flex.flex,
    ...Colors.darkBackgroundColor
  },
  heading: {
    ...Typography.mainHeading
  }
});
