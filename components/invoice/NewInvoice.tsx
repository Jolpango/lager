import { View, Text, Button, Alert, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Colors, Typography } from '../../styles';
import { IOrder } from '../../interfaces/orders';
import orderModel from "../../models/order";
import { Picker } from '@react-native-picker/picker';
import TextHeading from '../TextComponents/TextHeading';
import invoiceModel from '../../models/invoice';

function getFormattedDate(date: Date) {
  let year = date.getFullYear() - 2000;
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return month + '/' + day + '/' + year;
}

export default function NewInvoice({ navigation, route }: any) {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentOrder, setCurrentOrder] = useState<IOrder>();
  const month = 1000 * 60 * 60 * 24 * 30;
  const creation_date = getFormattedDate(new Date());
  const due_date = getFormattedDate(new Date(new Date().getTime() + month));
  async function createInvoice(order: IOrder) {
    await invoiceModel.createInvoice(order, creation_date, due_date);
    await route.params.reloadInvoices();
  }
  useEffect(() => {
    (async () => {
      setOrders(await orderModel.getOrders() as IOrder[]);
    })();
  }, []);
  const pickerList = orders.filter((order: IOrder) => {
    return order.status === "Packad" || "Skickad";
  }).map((order: IOrder, index: number) => {
    return <Picker.Item key={index} label={`${order.id} ${order.name}`} value={order} style={{...Typography.paragraphBasic, ...Colors.lightBackgroundColor}} />
  });
  return (
    <ScrollView style={{...Colors.darkBackgroundColor}}>
      <TextHeading>Ny faktura</TextHeading>
      <Picker
        style={{...Colors.lightBackgroundColor, ...Typography.paragraphBasic, marginVertical: 30, width:"90%", alignSelf:"center"}}
        selectedValue={currentOrder}
        onValueChange={(itemValue) => {
          setCurrentOrder(itemValue);
        }}
      >
        {pickerList}
      </Picker>
      <View style={{width:"90%", alignSelf: "center"}}>
        <Button
          title="Fakturera"
          color={Colors.primaryAccentColor.backgroundColor}
          onPress={async () => {
            if (currentOrder) {
              await createInvoice(currentOrder);
              navigation.navigate("Invoices", {reload: true})
            } else {
              Alert.alert("Fel", "Något fel inträffade");
            }
          }}
        />
      </View>
    </ScrollView>
  )
}
