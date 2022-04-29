import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Invoices from './Invoices';
import NewInvoice from './NewInvoice';
const Stack = createNativeStackNavigator();

export default function InvoiceNav({ orders, setOrders, invoices, setInvoices}: any) {
  return (
    <Stack.Navigator
      initialRouteName='Invoices'
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='Invoices'>
        {(screenProps) => <Invoices {...screenProps} invoices={invoices} />}
      </Stack.Screen>
      <Stack.Screen name='NewInvoice'>
        {(screenProps) => <NewInvoice {...screenProps} setInvoices={setInvoices} orders={orders} setOrders={setOrders} />}
      </Stack.Screen>
    </Stack.Navigator>
);
}
