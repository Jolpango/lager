import React, { useEffect, useState } from 'react'
import { Button, ScrollView, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { IDelivery } from '../interfaces/delivery';
import deliveryModel from '../models/delivery';
import { Colors } from "../styles/index";
import TextHeading from './TextComponents/TextHeading';
import TextParagraph from './TextComponents/TextParagraph';
import TextSmall from './TextComponents/TextSmall';
import TextSubHeading from './TextComponents/TextSubHeading';


export default function DeliveryList({ route, navigation }: any) {
  const [deliveries, setDeliveries] = useState<IDelivery[]>([]);
  const refreshDeliveries = async () => {
    setDeliveries(await deliveryModel.getDeliveries());
  }
  useEffect(() => {
    refreshDeliveries();
  }, [])
  return (
    <ScrollView style={{...Colors.darkBackgroundColor}}>
      <TextHeading>Inleveranser</TextHeading>
      <DeliveryListComponent deliveries={deliveries}/>
      <View style={{paddingVertical: 10}}></View>
      <Button
        title="Ny inleverans"
        color={Colors.secondaryAccentColor.backgroundColor}
        onPress={() => {
            navigation.navigate('Form', {reload: true, refreshDeliveries: refreshDeliveries});
        }}
      />
      <View style={{paddingVertical: 10}}></View>
    </ScrollView>
  )
}

function DeliveryListComponent({deliveries}: {deliveries: Array<IDelivery>}) {
  if (deliveries.length > 0) {
    const list = deliveries.map((delivery, index: number) => {
      return (
        <DataTable.Row key={index}>
          <DataTable.Cell><TextSmall>{delivery.id}</TextSmall></DataTable.Cell>
          <DataTable.Cell><TextSmall>{delivery.product_name}</TextSmall></DataTable.Cell>
          <DataTable.Cell><TextSmall>{delivery.amount}</TextSmall></DataTable.Cell>
          <DataTable.Cell><TextSmall>{delivery.delivery_date}</TextSmall></DataTable.Cell>
        </DataTable.Row>
      )
    });
    return (
      <DataTable>
        <DataTable.Header>
        <DataTable.Title><TextParagraph>ID</TextParagraph></DataTable.Title>
        <DataTable.Title><TextParagraph>Produkt</TextParagraph></DataTable.Title>
        <DataTable.Title><TextParagraph>Antal</TextParagraph></DataTable.Title>
        <DataTable.Title><TextParagraph>Datum</TextParagraph></DataTable.Title>
        </DataTable.Header>
        {list}
      </DataTable>
    );
  } else {
    return (
      <TextSubHeading>Inga inleveranser</TextSubHeading>
    );
  }
}
