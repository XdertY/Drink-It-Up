import React, { useState } from 'react';
import { Text, TouchableWithoutFeedback, Animated, View } from 'react-native'
import { gyroscope } from "react-native-sensors";

export const SensorTest = (props) => {
    const [currentValue, setCurrentValue] = useState();

    const subscription = gyroscope.subscribe(({ x, y, z, timestamp }) =>
        setCurrentValue({ x, y, z, timestamp })
    );

    return (
        <>
        <Text>
            {currentValue}
        </Text>
        </>
    )

}