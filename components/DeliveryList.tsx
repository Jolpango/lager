import React, { useEffect, useState } from 'react'
import { Button, View } from 'react-native';
import { IDelivery } from '../interfaces/delivery';
import deliveryModel from '../models/delivery';
import { Colors } from "../styles/index";
import TextParagraph from './TextComponents/TextParagraph';
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
    <View>
      <TextSubHeading>Inleveranser</TextSubHeading>
      <DeliveryListComponent deliveries={deliveries}/>
      <Button
        title="Ny inleverans"
        color={Colors.secondaryAccentColor.backgroundColor}
        onPress={() => {
            navigation.navigate('Form', {reload: true, refreshDeliveries: refreshDeliveries});
        }}
      />
    </View>
  )
}

function DeliveryListComponent({deliveries}: {deliveries: Array<IDelivery>}) {
  if (deliveries.length > 0) {
    const list = deliveries.map((delivery, index: number) => <TextParagraph key={index}>{delivery.id}: {delivery.product_name} Amount:{delivery.amount} {delivery.delivery_date}</TextParagraph>);
    return (
      <View>
        {list}
      </View>
    );
  } else {
    return (
      <TextSubHeading>Inga inleveranser</TextSubHeading>
    );
  }
}
