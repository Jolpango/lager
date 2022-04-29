import { View, Button, ScrollView } from 'react-native'
import React from 'react'
import { Colors, Typography } from '../../styles';
import InvoiceTable from './InvoiceTable';
import TextHeading from '../TextComponents/TextHeading';

export default function Invoices({ navigation, route, invoices }: any) {
  return (
    <ScrollView style={{...Colors.darkBackgroundColor}}>
      <TextHeading>Fakturor</TextHeading>
      <InvoiceTable invoices={invoices} />
      <View style={{width:"90%", alignSelf: "center"}}>
        <Button
          title="Ny faktura"
          color={Colors.primaryAccentColor.backgroundColor}
          onPress={() => {
            navigation.navigate("NewInvoice", {reload: true });
          }}
        />
      </View>
    </ScrollView>
  )
}
