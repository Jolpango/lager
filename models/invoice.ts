import { IOrderProduct } from './../interfaces/orders';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import config from "../config/config.json";
import { IInvoice } from "../interfaces/invoice";
import { IOrder } from "../interfaces/orders";
import products from "./product";
import storage from './storage';
import orders from './order';

const invoiceModel = {
  getInvoices: async function (): Promise<Array<IInvoice>> {
    const tokenData = await storage.readToken();
    const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
      headers: {
        "Content-Type": "application/json", 'x-access-token': tokenData.token
      }
    });
    const result = await response.json();
    if (result.errors) {
      return [];
    }
    return result.data;
  },
  createInvoice: async function (order: IOrder, creation_date: string, due_date: string) {
    const total_price = order.order_items?.reduce((sum: number, orderProduct: IOrderProduct) => {
      return sum + orderProduct.amount * orderProduct.price;
    }, 0)
    const tokenData = await storage.readToken();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", 'x-access-token': tokenData.token },
      body: JSON.stringify({ order_id: order.id, total_price: total_price, creation_date: creation_date, due_date: due_date, api_key: config.api_key })
    };
    const response = await fetch(`${config.base_url}/invoices`, requestOptions);
    const result = response.json();
    await orders.setOrderStatus(order, 600);
    return result;
  }
};

export default invoiceModel;