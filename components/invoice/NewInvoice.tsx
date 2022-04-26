import { View, Text, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Colors, Typography } from '../../styles';
import { IOrder } from '../../interfaces/orders';
import orderModel from "../../models/order";
import { Picker } from '@react-native-picker/picker';
import TextHeading from '../TextComponents/TextHeading';

export default function NewInvoice({ navigation, route }: any) {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentOrder, setCurrentOrder] = useState<IOrder>();
  async function createInvoice(order: IOrder) {

  }
  useEffect(() => {
    (async () => {
      setOrders(await orderModel.getOrders() as IOrder[]);
    })();
  }, []);
  const pickerList = orders.filter((order: IOrder) => {
    return order.status === "Packad" || "Skickad";
  }).map((order: IOrder, index: number) => {
    return <Picker.Item key={index} label={`${order.id} ${order.name}`} value={order} style={{...Typography.paragraphBasic, ...Colors.darkBackgroundColor}} />
  });
  return (
    <View>
      <TextHeading>Ny faktura</TextHeading>
      <Picker
        style={{...Colors.darkBackgroundColor, ...Typography.paragraphBasic, marginVertical: 30, width:"90%", alignSelf:"center"}}
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
    </View>
  )
}
