import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react'
import { IOrder } from '../../interfaces/orders';
import orderModel from "../../models/order";
import { DataTable } from 'react-native-paper';
import TextSmall from '../TextComponents/TextSmall';
import { Colors } from '../../styles';
import TextParagraph from '../TextComponents/TextParagraph';
import TextHeading from '../TextComponents/TextHeading';
import TextSubHeading from '../TextComponents/TextSubHeading';

interface props {
  navigation: any,
  route: any,
  orders: IOrder[],
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>
}

export default function ShippingList({navigation, route, orders, setOrders}: props) {
  const [refreshing, setRefreshing] = useState(false);
  async function loadOrders() {
    const orders = await orderModel.getOrders();
    setOrders(orders as IOrder[]);
  }
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  }, []);
  const orderRows = orders.filter((order, _) => {
    return order.status === "Packad";
  }).map((order, index) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell><TextSmall>{order.id}</TextSmall></DataTable.Cell>
        <DataTable.Cell><TextSmall>{order.name}</TextSmall></DataTable.Cell>
        <DataTable.Cell><TextSmall>{order.city}</TextSmall></DataTable.Cell>
        <DataTable.Cell>
          <Button
            title="Detaljer"
            color={Colors.primaryAccentColor.backgroundColor}
            onPress={() => {
              navigation.navigate("ShippingDetails", {reload: true, order: order})
            }}
          />
        </DataTable.Cell>
      </DataTable.Row>
    )
  });
  return (
    <ScrollView
      style={{...Colors.darkBackgroundColor}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <TextSubHeading>Ordrar som kan skickas</TextSubHeading>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title><TextParagraph>ID</TextParagraph></DataTable.Title>
          <DataTable.Title><TextParagraph>Namn</TextParagraph></DataTable.Title>
          <DataTable.Title><TextParagraph>Stad</TextParagraph></DataTable.Title>
          <DataTable.Title><TextParagraph>Detaljer</TextParagraph></DataTable.Title>
        </DataTable.Header>
        {orderRows}
      </DataTable>
    </ScrollView>
  )
}
