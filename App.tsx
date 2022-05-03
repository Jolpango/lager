import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flex, Colors } from './styles/index';
import Home from "./components/Home";
import Pick from "./components/Pick";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { IProduct } from './interfaces/products';
import Deliveries from './components/Deliveries';
import productModel from './models/product';
import authModel from './models/auth';
import Auth from './components/auth/Auth';
import TextParagraph from './components/TextComponents/TextParagraph';
import storage from './models/storage';
import orderModel from './models/order';
import { IOrder } from './interfaces/orders';
import InvoiceNav from './components/invoice/InvoiceNav';
import ShippingNav from './components/shipping/ShippingNav';
import invoiceModel from './models/invoice';
import { IInvoice } from './interfaces/invoice';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const Tab = createBottomTabNavigator();

interface IStringByString {
  [key: string]: string;
}

const iconNames: IStringByString = {
  "Lager": "business",
  "Plock": "list",
  "Användare": "person",
  "Fakturor": "cash",
  "Leverans": "bus",
  "Skicka": "send"
}

export default function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const refreshInventory = async () => {
    const p = await productModel.getProducts();
    setProducts(p);
  }
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setIsLoggedIn(await authModel.loggidIn());
    })();
  }, []);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const refreshOrders = async () => {
    const o = await orderModel.getOrders();
    setOrders(o as IProduct[]);
  };
  useEffect(() => {
    refreshOrders();
    refreshInventory();
  }, []);
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  useEffect(() => {
    (async () => {
      setInvoices(await invoiceModel.getInvoices());
    })();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={DarkTheme as any}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = iconNames[route.name] || "alert";
              return <Ionicons name={iconName as any} size={size} color={color}></Ionicons>
            },
            tabBarActiveTintColor: Colors.primaryAccentColor.backgroundColor,
            tabBarInactiveTintColor: Colors.lightFontColor.color,
            tabBarActiveBackgroundColor: Colors.darkBackgroundColor.backgroundColor,
            tabBarInactiveBackgroundColor: Colors.darkBackgroundColor.backgroundColor,
            tabBarStyle: styles.navigation,
            headerStyle: styles.header,
            headerRight: () => {
              if (isLoggedIn) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("Logga ut", "Vill du logga ut?", [
                        {text: "Ja", onPress: () => {
                          setIsLoggedIn(false);
                          storage.deleteToken();
                          showMessage({
                            message: "Utloggad",
                            description: "Du är nu utloggad",
                            type: "danger"
                          });
                        }},
                        {text: "Nej"}
                      ],
                      {cancelable: true})
                    }}
                    style={{paddingRight: 20, flex: 1, flexDirection:"row", alignItems: "center"}}
                  >
                    <TextParagraph>Logga ut</TextParagraph>
                    <Ionicons name="log-out" size={25} color={"#fff"}></Ionicons>
                  </TouchableOpacity>
                )
              }
          }
        })}>
          <Tab.Screen name="Lager" children={ () => <Home refreshInventory={refreshInventory} products={products}/> } />
          {isLoggedIn ?
            <Tab.Screen name="Fakturor" children={ () => <InvoiceNav orders={orders} setOrders={setOrders} invoices={invoices} setInvoices={setInvoices}/> } /> :
            <Tab.Screen name="Användare" children={ () => <Auth setIsLoggedIn={setIsLoggedIn}/> } />
          }
          <Tab.Screen name="Leverans" children={ () => <Deliveries refreshInventory={refreshInventory}/> } />
          <Tab.Screen name="Plock" children={ () => <Pick refreshInventory={refreshInventory} orders={orders} setOrders={setOrders} /> } />
          <Tab.Screen name="Skicka" children={ () => <ShippingNav orders={orders} setOrders={setOrders} /> }></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" backgroundColor={Colors.primaryAccentColor.backgroundColor}></StatusBar>
      <FlashMessage position={{top: 30, left: 0, right: 0}}/>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    ...Flex.flex,
    ...Colors.darkBackgroundColor
  },
  navigation: {
    ...Colors.lightFontColor,
    ...Colors.darkBackgroundColor,
    paddingBottom: 10,
    paddingTop: 10,
    height: 70
  },
  header: {
    height: 70,
    ...Colors.primaryAccentColor
  }
});
