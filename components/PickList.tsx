import { View, Button, Alert, ScrollView } from "react-native";
import { Colors } from "../styles/index";
import { IOrderProduct } from "../interfaces/orders";
import orderModel from "../models/order";
import TextParagraph from "./TextComponents/TextParagraph";

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
        <TextParagraph key={index}>
          {item.name} - {item.amount} - {item.location}
        </TextParagraph>
    );
  });

  return (
    <ScrollView style={{...Colors.darkBackgroundColor}}>
      <TextParagraph>{order.name}</TextParagraph>
      <TextParagraph>{order.address}</TextParagraph>
      <TextParagraph>{order.zip} {order.city}</TextParagraph>
      <TextParagraph>Produkter:</TextParagraph>
      {orderItemsList}
      <Button title="Plocka order" onPress={pick} color={Colors.secondaryAccentColor.backgroundColor} />
    </ScrollView>
  )
};