import config from "../config/config.json";
import { IDelivery } from "../interfaces/delivery";

const deliveryModel = {
  addDelivery: async function(delivery: Partial<IDelivery>) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...delivery, api_key: config.api_key })
    };
    const response = await fetch(`${config.base_url}/deliveries`, requestOptions);
    // console.log(response.ok);
  },
  getDeliveries: async function(): Promise<Array<IDelivery>> {
    const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
    const result = await response.json();
    return result.data;
  }
};

export default deliveryModel;