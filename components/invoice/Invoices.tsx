import { View, Text, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Typography } from '../../styles';
import InvoiceTable from './InvoiceTable';
import { IInvoice } from '../../interfaces/invoice';
import invoiceModel from '../../models/invoice';
import TextHeading from '../TextComponents/TextHeading';

export default function Invoices({ navigation, route }: any) {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const reloadInvoices = async () => {
    setInvoices(await invoiceModel.getInvoices());
  }
  useEffect(() => {
    (async () => {
      setInvoices(await invoiceModel.getInvoices());
    })();
  }, [])
  return (
    <ScrollView style={{...Colors.darkBackgroundColor}}>
      <TextHeading>Fakturor</TextHeading>
      <InvoiceTable invoices={invoices} />
      <View style={{width:"90%", alignSelf: "center"}}>
        <Button
          title="Ny faktura"
          color={Colors.primaryAccentColor.backgroundColor}
          onPress={() => {
            navigation.navigate("NewInvoice", {reload: true, reloadInvoices: reloadInvoices});
          }}
        />
      </View>
    </ScrollView>
  )
}
