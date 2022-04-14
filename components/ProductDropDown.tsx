import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { IProduct } from '../interfaces/products';
import productModel from "../models/product";
import { Typography, Colors } from '../styles';

export default function ProductDropDown(props: any) {
    const [products, setProducts] = useState<IProduct[]>([]);
    let productsHash: any = {};

    useEffect(() => {
        async function fetchProducts() {
            setProducts(await productModel.getProducts());
        }
        fetchProducts();
    }, []);

    const itemsList = products.map((prod: IProduct, index: number) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} style={{...Typography.paragraphBasic, ...Colors.darkBackgroundColor}}/>;
    });

    return (
        <Picker
            style={{...Colors.darkBackgroundColor, ...Typography.paragraphBasic, margin: 5}}
            selectedValue={props.currentProduct?.id}
            onValueChange={(itemValue) => {
                // props.setDelivery({ ...props.delivery, product_id: productsHash[itemValue].product_id, product_name: productsHash[itemValue].product_name});
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}