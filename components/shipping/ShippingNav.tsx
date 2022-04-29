import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ShippingList from './ShippingList';
import ShippingDetails from './ShippingDetails';
import { IOrder } from '../../interfaces/orders';

const Stack = createNativeStackNavigator();

export default function ShippingNav({orders, setOrders}: {orders: IOrder[], setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>}) {
  return (
    <Stack.Navigator
      initialRouteName="ShippingList"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="ShippingList">
        {(screenProps) => <ShippingList {...screenProps} orders={orders} setOrders={setOrders}/>}
      </Stack.Screen>
      <Stack.Screen name="ShippingDetails">
        {(screenProps) => <ShippingDetails {...screenProps} setOrders={setOrders}/>}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
