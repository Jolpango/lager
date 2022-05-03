import React, { View, Text } from 'react-native';
import { Image, ScrollView, StyleSheet } from 'react-native';
import Stock from "./Stock";
import { Colors, Flex } from './../styles/index';
import TextHeading from './TextComponents/TextHeading';
import { IProduct } from '../interfaces/products';


export default function Home({refreshInventory, products}: {refreshInventory: any, products: Array<IProduct>}) {
  return (
    <ScrollView style={styles.base}>
      <View style={{width:"100%", height: 300}}>
        <Image source={require("./../assets/warehouse.jpg")} style={{ position: "absolute", height: 300, width: "100%"}}></Image>
        <Text style={styles.header}>Skruvat Lager</Text>
      </View>
      <Stock products={products}/>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  base: {
    ...Flex.flex,
    ...Colors.darkBackgroundColor
  },
  header: {
    backgroundColor: "rgba(30, 30, 30, 0.7)",
    padding: 16,
    fontSize: 42,
    color: "#fff",
    textAlign: "center",
    // textShadowColor: "#000",
    // textShadowOffset: {width: 5, height: 1 },
    // textShadowRadius: 5
  }
});
