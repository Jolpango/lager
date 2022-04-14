import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Button, View } from "react-native";
import { Colors } from '../styles';

export default function DateDropDown(props: any) {
  const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
  const [show, setShow] = useState<Boolean>(false);

  const showDatePicker = () => {
    setShow(true);
  };
  return (
    <View>
      {Platform.OS === "android" && (
        <Button onPress={showDatePicker} title={dropDownDate.toLocaleDateString("sv-SE")} color={Colors.primaryAccentColor.backgroundColor} />
      )}
      {(show || Platform.OS === "ios") && (
        <DateTimePicker
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          value={dropDownDate}
          onChange={(_event: any, value: any) => {
            if (value !== undefined) {
              setDropDownDate(value);
              props.setCurrentDate(value.toLocaleDateString("sv-SE"));
            }
            setShow(false);
          }}
        />
      )}
    </View>
  );
}