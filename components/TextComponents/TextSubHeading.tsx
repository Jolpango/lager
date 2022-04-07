import { Text } from 'react-native'
import React from 'react'
import { Typography } from '../../styles';

function TextSubHeading(props: any) {
  return (
    <Text style={Typography.subHeading}>
      {props.children}
    </Text>
  );
};

export default TextSubHeading