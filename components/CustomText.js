import React from 'react';
import { Text } from 'react-native';

export default CustomText = (props) => {
    return (
        <Text style={{fontFamily: 'Lobster-Regular', ...props.style }}>
            {props.text}
            {props.children}
        </Text>
    )
}