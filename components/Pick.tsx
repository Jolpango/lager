import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IOrder } from '../interfaces/orders';
import OrderList from './OrderList';
import PickList from './PickList';
const Stack = createNativeStackNavigator();

export default function Pick({refreshInventory, orders, setOrders}:
  {refreshInventory: any, orders: IOrder[], setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>}) {
    return (
        <Stack.Navigator
          initialRouteName='List'
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name='List'>
            {(screenProps) => <OrderList {...screenProps} orders={orders} />}
          </Stack.Screen>
          <Stack.Screen name='Details'>
            {(screenProps) => <PickList {...screenProps} refreshInventory={refreshInventory} setOrders={setOrders} />}
          </Stack.Screen>
        </Stack.Navigator>
    );
}
