import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Invoices from './Invoices';
import NewInvoice from './NewInvoice';
const Stack = createNativeStackNavigator();

export default function InvoiceNav({setIsLoggedIn}: any) {
  return (
    <Stack.Navigator
      initialRouteName='Invoices'
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='Invoices' component={Invoices} />
      <Stack.Screen name='NewInvoice' component={NewInvoice} />
    </Stack.Navigator>
);
}
