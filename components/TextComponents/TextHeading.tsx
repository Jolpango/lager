import { Text } from 'react-native'
import React from 'react'
import { Typography } from '../../styles';

function TextHeading(props: any) {
  return (
    <Text style={Typography.mainHeading}>
      {props.children}
    </Text>
  );
};

export default TextHeading