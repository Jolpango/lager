import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IOrder } from '../interfaces/orders';
import OrderList from './OrderList';
import PickList from './PickList';
const Stack = createNativeStackNavigator();

export default function Pick({refreshInventory}:
  {refreshInventory: any}) {
    return (
        <Stack.Navigator
          initialRouteName='List'
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name='List' component={OrderList} initialParams={{refreshInventory: refreshInventory}} />
          <Stack.Screen name='Details' component={PickList} />
        </Stack.Navigator>
    );
}
