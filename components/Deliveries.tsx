import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DeliveryForm from './DeliveryForm';
import DeliveryList from './DeliveryList';
import { IProduct } from '../interfaces/products';
import { IDelivery } from '../interfaces/delivery';
import deliveryModel from '../models/delivery';

const Stack = createNativeStackNavigator();

export default function Deliveries({refreshInventory}: {refreshInventory: any}) {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="List" component={DeliveryList}/>
      <Stack.Screen name="Form" component={DeliveryForm} initialParams={{refreshInventory: refreshInventory}}/>
    </Stack.Navigator>
  )
}