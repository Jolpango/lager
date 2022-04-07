import React, { RefreshControl } from 'react-native';
import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import Stock from "./Stock";
import { Colors, Flex, Typography } from './../styles/index';
import TextHeading from './TextComponents/TextHeading';
import { IProduct } from '../interfaces/products';


export default function Home({refreshInventory, products}: {refreshInventory: any, products: Array<IProduct>}) {
  return (
    <ScrollView style={styles.base}>
      <TextHeading>Skruvat Lager</TextHeading>
      <Image source={require("./../assets/warehouse.jpg")} style={{width: "100%"}}></Image>
      <Stock products={products}/>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  base: {
    ...Flex.flex,
    ...Colors.darkBackgroundColor
  },
  heading: {
    ...Typography.mainHeading
  }
});
