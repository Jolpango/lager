import { IOrderProduct } from './../interfaces/orders';
import { Alert } from 'react-native';
import { IProduct } from './../interfaces/products';
import config from "../config/config.json";

const productModel = {
  getProducts: async function (): Promise<Array<IProduct>> {
    const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
    const result = await response.json();
    return result.data;
  },
  getProduct: async function (id: number): Promise<Partial<IProduct>> {
    const response = await fetch(`${config.base_url}/products/${id}?api_key=${config.api_key}`);
    const result = await response.json();
    return result.data;
  },
  removeFromStock: async function (product: IOrderProduct) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: product.product_id, name: product.name, stock: product.stock - product.amount, api_key: config.api_key })
    };
    const response = await fetch(`${config.base_url}/products`, requestOptions);
    return response;
  },
  setProductStock: async function (product_id: number, product_name: string, newStock: number) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: product_id, name: product_name, stock: newStock, api_key: config.api_key })
    };
    const response = await fetch(`${config.base_url}/products`, requestOptions);
  }
};

export default productModel;
