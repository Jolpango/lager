import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Typography } from '../../styles';
import InvoiceTable from './InvoiceTable';
import { IInvoice } from '../../interfaces/invoice';
import invoiceModel from '../../models/invoice';

export default function Invoices({ navigation, route }: any) {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  useEffect(() => {
    (async () => {
      setInvoices(await invoiceModel.getInvoices());
    })();
  }, [])
  return (
    <View>
      <InvoiceTable invoices={invoices} />
      <View style={{width:"90%", alignSelf: "center"}}>
        <Button
          title="Ny faktura"
          color={Colors.primaryAccentColor.backgroundColor}
          onPress={() => {
            navigation.navigate("NewInvoice", {reload: true});
          }}
        />
      </View>
    </View>
  )
}
