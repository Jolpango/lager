import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DeliveryForm from './DeliveryForm';
import DeliveryList from './DeliveryList';
import { IProduct } from '../interfaces/products';
import { IDelivery } from '../interfaces/delivery';
import deliveryModel from '../models/delivery';

const Stack = createNativeStackNavigator();

export default function Deliveries({refreshInventory}: {refreshInventory: any}) {
  const [deliveries, setDeliveries] = useState<IDelivery[]>([]);
  const refreshDeliveries = async () => {
    setDeliveries(await deliveryModel.getDeliveries());
  }
  
  useEffect(() => {
    refreshDeliveries();
  }, [])
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="List">
        {(screenProps) => <DeliveryList {...screenProps} deliveries={deliveries} setDeliveries={setDeliveries}/>}
      </Stack.Screen>
      <Stack.Screen name="Form">
        {(screenProps) => <DeliveryForm {...screenProps} refreshDeliveries={refreshDeliveries} refreshInventory={refreshInventory} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}