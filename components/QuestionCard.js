import React from 'react'
import { Pressable, StyleSheet, SafeAreaView } from 'react-native'
import CustomText from './CustomText'


export const QuestionCard = (props) => {

    const backgroundColors = {
        1: "#ff8000",
        2: "#0091ff",
        3: "#32a852",
        4: "#ff005d"
    }

    const types = {
        1: 'Dare: ',
        2: 'Game: ', 
        3: 'Question: ',
        4: ''
    }

    return (

        <SafeAreaView style={{...styles.container, backgroundColor: backgroundColors[props.question.type]}}>
            <Pressable style={styles.container} onPress={() => props.next(new Date().getTime())}>
                <CustomText style={{ fontSize: 60, textAlign: "center", color: "white", fontWeight: 'bold' }}>{types[props.question.type]}</CustomText>
                <CustomText style={{ fontSize: props.question.type === 4 ? 70 : 50, textAlign: "center", color: "white" }}>{props.question.question}</CustomText>
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