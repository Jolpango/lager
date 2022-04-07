import { Text } from 'react-native'
import React from 'react'
import { Typography } from '../../styles';

function TextParagraph(props: any) {
  return (
    <Text style={Typography.paragraphBasic}>
      {props.children}
    </Text>
  );
};

export default TextParagraph