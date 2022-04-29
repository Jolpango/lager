import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TextSubHeading from './TextComponents/TextSubHeading';
import { DataTable } from 'react-native-paper';
import TextParagraph from './TextComponents/TextParagraph';
import TextSmall from './TextComponents/TextSmall';
import { Colors } from '../styles';
import { IOrder, IOrderProduct } from '../interfaces/orders';

export default function OrderTable({order}: {order: IOrder}) {
  let orderItemsList: JSX.Element[] = [];
  if (order.order_items) {
    orderItemsList = order.order_items.map((item: Partial<IOrderProduct>, index: number) => {
      return (
        <DataTable.Row key={index}>
          <DataTable.Cell><TextSmall>{item.name}</TextSmall></DataTable.Cell>
          <DataTable.Cell><TextSmall>{item.amount}</TextSmall></DataTable.Cell>
          <DataTable.Cell><TextSmall>{item.location}</TextSmall></DataTable.Cell>
        </DataTable.Row>
      );
    });
  }

  return (
    <View style={{...Colors.darkBackgroundColor}}>
      <TextSubHeading>Kund</TextSubHeading>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title><TextParagraph>Namn</TextParagraph></DataTable.Title>
          <DataTable.Title><TextParagraph>Address</TextParagraph></DataTable.Title>
          <DataTable.Title><TextParagraph>Stad/Postnr</TextParagraph></DataTable.Title>
        </DataTable.Header>
        <DataTable.Row key={6854}>
        <DataTable.Cell><TextSmall>{order.name}</TextSmall></DataTable.Cell>
        <DataTable.Cell><TextSmall>{order.address}</TextSmall></DataTable.Cell>
        <DataTable.Cell><TextSmall>{order.city}/{order.zip}</TextSmall></DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <TextSubHeading>Produkter</TextSubHeading>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title><TextParagraph>Produkt</TextParagraph></DataTable.Title>
          <DataTable.Title><TextParagraph>Antal</TextParagraph></DataTable.Title>
          <DataTable.Title><TextParagraph>Plats</TextParagraph></DataTable.Title>
        </DataTable.Header>
        {orderItemsList}
      </DataTable>
    </View>
  )
}