import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import config from "../config/config.json";
import { Typography } from "../styles";

interface ISpecifier {
  [key: string]: any;
};

interface IProduct {
  id: number;
  article_number: string;
  name: string;
  stock: number;
  location: string;
  price: number;
  specifiers: ISpecifier[];
};

function StockList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
    .then(response => response.json())
    .then(result => setProducts(result.data));
  }, []);
  const list = products.map((product, index) => <Text style={{color: "#fff", fontSize: 20}} key={index}>{ `${product.name} Stock:${product.stock}`}</Text>);
  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock() {
  return (
    <View>
      <Text style={Typography.paragraphBasic}>Lagerförteckning</Text>
      <StockList></StockList>
    </View>
  );
}
