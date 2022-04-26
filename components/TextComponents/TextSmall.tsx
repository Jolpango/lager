import { Text } from 'react-native'
import React from 'react'
import { Typography } from '../../styles';

function TextSmall(props: any) {
  return (
    <Text style={Typography.textSmall}>
      {props.children}
    </Text>
  );
};

export default TextSmall