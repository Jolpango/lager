import  AsyncStorage  from '@react-native-async-storage/async-storage';
import config from "../config/config.json";
import { IInvoice } from "../interfaces/invoice";
import { IOrder } from "../interfaces/orders";
import products from "./product";

const invoiceModel = {
  getInvoices: async function (): Promise<Array<IInvoice>> {
    const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", "token": AsyncStorage.getItem("@token") }
    };
    const result = await response.json();
    return result.data;
  },
  setOrderStatus: async function (order: Partial<IOrder>, status: number) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: order.id, name: order.name, status_id: status, api_key: config.api_key })
    };
    const response = await fetch(`${config.base_url}/orders`, requestOptions);
    return response;
  },
  pickOrder: async function (order: Partial<IOrder>): Promise<boolean> {
    const items = order.order_items ?? [];
    let canPick = items.length > 0;
    for (let i = 0; canPick && i < items.length; i++) {
      if (items[i].amount > items[i].stock) {
        canPick = false;
      }
    }
    if (canPick) {
      items.forEach(async item => {
        await products.removeFromStock(item);
      });
      await this.setOrderStatus(order, 200);
    }
    return canPick;
  }
};

export default invoiceModel;