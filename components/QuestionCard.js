import React, { useEffect } from 'react'
import { Text, Pressable, StyleSheet, SafeAreaView } from 'react-native'
import CustomText from './CustomText'
import { Wrapper } from './Wrapper'

export const QuestionCard = (props) => {

    const backgroundColors = {
        1: "#ff8000",
        2: "#0091ff",
        3: "#32a852",
        4: "#ff005d"
    }

    return (

        <SafeAreaView style={{...styles.container, backgroundColor: backgroundColors[props.question.type]}}>
            <Pressable style={styles.container} onPress={() => props.next(new Date().getTime())}>
                <CustomText style={{ fontSize: 60, textAlign: "center", color: "white" }}>{props.question.question}</CustomText>
            </Pressable>

        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})