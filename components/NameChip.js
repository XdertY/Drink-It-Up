import React from 'react';
import { View, StyleSheet, Text, Button, Pressable } from 'react-native';

export const NameChip = (props) => {
    return (
        <View style={styles.container}>
                <Text style={styles.text}>{props.playerName}</Text>
                <Pressable  style={styles.button} onPress={() => props.removePlayerHandler(props.playerKey)}>
                    <Text>{"X"}
                    </Text>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "#cccccc",
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 2,
        justifyContent: "center",
        width: "auto",
        marginHorizontal: 10,
        marginTop: 0,
        paddingTop: 0,
        alignItems: 'center'
    },
    text: {
        margin: 10
    },
    button: {
        elevation: 0,
        backgroundColor: 'transparent',
        padding: 10

        
    }

   
})