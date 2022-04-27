import { View, Text, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import config from "./../config/config.json";
import { Colors, Typography } from '../styles';
import { IOrder } from '../interfaces/orders';
import orders from '../models/order';
import TextHeading from './TextComponents/TextHeading';
import TextSubHeading from './TextComponents/TextSubHeading';
import { DataTable } from 'react-native-paper';
import TextSmall from './TextComponents/TextSmall';
import TextParagraph from './TextComponents/TextParagraph';

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
      return (
        <DataTable.Row key={index}>
          <DataTable.Cell><TextSmall>{order.id}</TextSmall></DataTable.Cell>
          <DataTable.Cell><TextSmall>{order.name}</TextSmall></DataTable.Cell>
          <DataTable.Cell>
            <Button
              color={Colors.secondaryAccentColor.backgroundColor}
              title="Detaljer"
              onPress={() => {
                navigation.navigate('Details', {
                  order: order,
                  refreshInventory: route.params.refreshInventory,
                  refreshOrders: refreshOrders
                });
              }}
            />
          </DataTable.Cell>
        </DataTable.Row>
      )
    });

  return (
    <ScrollView style={{...Colors.darkBackgroundColor}}>
      <TextSubHeading>Ordrar redo att plockas</TextSubHeading>
      <DataTable>
        <DataTable.Header>
        <DataTable.Title><TextParagraph>ID</TextParagraph></DataTable.Title>
        <DataTable.Title><TextParagraph>Namn</TextParagraph></DataTable.Title>
        <DataTable.Title><TextParagraph>Detaljer</TextParagraph></DataTable.Title>
        </DataTable.Header>
      </DataTable>
      {listOfOrders}
    </ScrollView>
  );
}