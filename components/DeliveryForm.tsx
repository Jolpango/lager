import { Button, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import TextSubHeading from './TextComponents/TextSubHeading';
import TextParagraph from './TextComponents/TextParagraph';
import { IDelivery } from '../interfaces/delivery';
import { Colors, Typography } from "../styles/index";
import ProductDropDown from "./ProductDropDown"
import { IProduct } from '../interfaces/products';
import deliveryModel from '../models/delivery';
import DateDropDown from './DateDropDown';
import productModel from '../models/product';
import { showMessage } from 'react-native-flash-message';

function getFormattedDate(date: Date) {
  let year = date.getFullYear() - 2000;
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return month + '/' + day + '/' + year;
}

export default function DeliveryForm({route, navigation, refreshDeliveries, refreshInventory }: any) {
  const [currentProduct, setCurrentProduct] = useState<IProduct>();
  const [currentDate, setCurrentDate] = useState<string>(getFormattedDate(new Date()));
  const [delivery, setDelivery] = useState<Partial<IDelivery>>({})
  async function addDelivery() {
    if (currentProduct !== undefined && currentDate !== undefined) {
      setDelivery({...delivery, delivery_date: currentDate, product_id: currentProduct.id})
      const newDeliveryObjectCauseFuckThis: Partial<IDelivery> = {
        ...delivery,
        delivery_date: currentDate,
        product_id: currentProduct.id
      }
      if(newDeliveryObjectCauseFuckThis.amount && newDeliveryObjectCauseFuckThis.amount > 0) {
        await deliveryModel.addDelivery(newDeliveryObjectCauseFuckThis);
        await productModel.setProductStock(currentProduct.id, currentProduct.name, (currentProduct.stock ?? 0) + (delivery.amount ?? 0));
        await refreshInventory();
        await refreshDeliveries();
        showMessage({
          message: "Inleverans",
          description: "Ny inleverans gjord",
          type: "success"
        })
        navigation.navigate("List", { reload: true })
      } else {
        showMessage({
          message: "Fel",
          description: "Antalat måste vara större än 0",
          type: "warning"
        })
      }
    }
  }
  return (
    <ScrollView style={{...Colors.darkBackgroundColor}}>
      <TextSubHeading>Ny inleverans</TextSubHeading>
      <TextParagraph>Product</TextParagraph>
      <ProductDropDown
        delivery={delivery}
        setDelivery={setDelivery}
        setCurrentProduct={setCurrentProduct}
        currentProduct={currentProduct}
      />
      <DateDropDown
        setCurrentDate={(setCurrentDate)}
      />
      <TextParagraph>Kommentar</TextParagraph>
      <TextInput
        style={styles.input}
        onChangeText={(content: string) => {
          setDelivery({...delivery, comment: content})
        }}
        value={delivery?.comment}
      />
      <TextParagraph>Antal</TextParagraph>
      <TextInput
        style={styles.input}
        onChangeText={(content: string) => {
          let number = 0;
          if (!isNaN(parseInt(content))) {
            number = parseInt(content);
          }
          setDelivery({...delivery, amount: number})
        }}
        keyboardType="phone-pad"
        value={ (() => {
          const number = delivery?.amount ?? "";
          return number.toString();
        })()
        }
      />
      <Button
        color={Colors.secondaryAccentColor.backgroundColor}
        title="Gör inleverans"
        onPress={() => {
          addDelivery();
        }}
      />
    </ScrollView>
  )
}


export const styles = StyleSheet.create({
  input: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#555",
    fontSize: 20, color:"#fff",
    backgroundColor:"#333",
    padding:10,
    marginBottom:30
  }
});
