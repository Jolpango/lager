import { View, Button, Alert, ScrollView } from "react-native";
import { Colors } from "../styles/index";
import { IOrderProduct } from "../interfaces/orders";
import orderModel from "../models/order";
import TextParagraph from "./TextComponents/TextParagraph";
import { DataTable } from "react-native-paper";
import TextSmall from "./TextComponents/TextSmall";
import TextSubHeading from "./TextComponents/TextSubHeading";

export default function PickList({ route, navigation }: any) {
  const { order, refreshInventory, refreshOrders } = route.params;

  async function pick() {
    const success = await orderModel.pickOrder(order);
    if (success) {
      await refreshInventory();
      await refreshOrders();
      navigation.navigate("List", {reload: true});
    } else {
      Alert.alert("Error", "Ordern kan inte plockas");
    }
  }

  const orderItemsList = order.order_items.map((item: Partial<IOrderProduct>, index: number) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell><TextSmall>{item.name}</TextSmall></DataTable.Cell>
        <DataTable.Cell><TextSmall>{item.amount}</TextSmall></DataTable.Cell>
        <DataTable.Cell><TextSmall>{item.location}</TextSmall></DataTable.Cell>
      </DataTable.Row>
    );
  });

  return (
    <ScrollView style={{...Colors.darkBackgroundColor}}>
      <TextSubHeading>Kund</TextSubHeading>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title><TextParagraph>Namn</TextParagraph></DataTable.Title>
          <DataTable.Title><TextParagraph>Address</TextParagraph></DataTable.Title>
          <DataTable.Title><TextParagraph>Stad/Postnr</TextParagraph></DataTable.Title>
        </DataTable.Header>
        <DataTable.Row key={312978234}>
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
      <Button title="Plocka order" onPress={pick} color={Colors.secondaryAccentColor.backgroundColor} />
    </ScrollView>
  )
};