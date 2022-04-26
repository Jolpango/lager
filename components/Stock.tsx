import { View } from "react-native";
import { DataTable } from "react-native-paper";
import { IProduct } from "../interfaces/products";
import TextParagraph from "./TextComponents/TextParagraph";
import React from "react";
import TextSmall from "./TextComponents/TextSmall";

export default function Stock({products}: {products: Array<IProduct>}) {
  const tableBody = products.map((product, index) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell><TextSmall>{product.id}</TextSmall></DataTable.Cell>
        <DataTable.Cell><TextSmall>{product.name}</TextSmall></DataTable.Cell>
        <DataTable.Cell><TextSmall>{product.stock}</TextSmall></DataTable.Cell>
        <DataTable.Cell><TextSmall>{product.location}</TextSmall></DataTable.Cell>
      </DataTable.Row>
    );
  })
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title><TextParagraph>ID</TextParagraph></DataTable.Title>
        <DataTable.Title><TextParagraph>Namn</TextParagraph></DataTable.Title>
        <DataTable.Title><TextParagraph>Antal</TextParagraph></DataTable.Title>
        <DataTable.Title><TextParagraph>Plats</TextParagraph></DataTable.Title>
      </DataTable.Header>
      {tableBody}
    </DataTable>
  );
}
