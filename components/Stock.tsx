import { View } from "react-native";
import { IProduct } from "../interfaces/products";
import TextParagraph from "./TextComponents/TextParagraph";
import TextSubHeading from "./TextComponents/TextSubHeading";


function StockList({products}: {products: Array<IProduct>}) {
  const list = products.map((product, index) => <TextParagraph key={index}>{product.name} Stock:{product.stock} id:{product.id}</TextParagraph>);
  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock({products}: {products: Array<IProduct>}) {
  return (
    <View>
      <TextSubHeading>Lagerförteckning</TextSubHeading>
      <StockList products={products}/>
    </View>
  );
}
