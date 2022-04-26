import { View, Text, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import config from "./../config/config.json";
import { Colors, Typography } from '../styles';
import { IOrder } from '../interfaces/orders';
import orders from '../models/order';

type Props = {
  navigation: any,
  route: any
};

export default function OrderList({ navigation, route }: Props) {
  const [allOrders, setAllOrders] = useState<Partial<IOrder>[]>([]);
  const refreshOrders = async () => {
    const o = await orders.getOrders();
    setAllOrders(o);
  }
  useEffect(() => {
    refreshOrders()
  }, [])
  const listOfOrders = allOrders
    .filter((order: any) => order.status === "Ny")
    .map((order: any, index: number) => {
      return <Button
        color={Colors.secondaryAccentColor.backgroundColor}
        title={`${order.name} - ${order.id}`}
        key={index}
        onPress={() => {
          navigation.navigate('Details', {
            order: order,
            refreshInventory: route.params.refreshInventory,
            refreshOrders: refreshOrders
          });
        }}
      />
    });

  return (
    <ScrollView style={{...Colors.darkBackgroundColor}}>
      <Text style={Typography.subHeading}>Ordrar redo att plockas</Text>
      {listOfOrders}
    </ScrollView>
  );
}