import { DataTable } from "react-native-paper";
import React from "react";
import TextParagraph from "../TextComponents/TextParagraph";
import TextSmall from "../TextComponents/TextSmall";
import { IInvoice } from "../../interfaces/invoice";

export default function Stock({invoices}: {invoices: Array<IInvoice>}) {
  const tableBody = invoices.map((invoice, index) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell><TextSmall>{invoice.name}</TextSmall></DataTable.Cell>
        <DataTable.Cell><TextSmall>{invoice.total_price}</TextSmall></DataTable.Cell>
        <DataTable.Cell><TextSmall>{invoice.due_date}</TextSmall></DataTable.Cell>
      </DataTable.Row>
    );
  })
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title><TextParagraph>Namn</TextParagraph></DataTable.Title>
        <DataTable.Title><TextParagraph>Pris</TextParagraph></DataTable.Title>
        <DataTable.Title><TextParagraph>Förfallo</TextParagraph></DataTable.Title>
      </DataTable.Header>
      {tableBody}
    </DataTable>
  );
}
