import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export const NameChip = (props) => {
    return (
        <View style={styles.container}>
                <Text style={styles.text}>{props.playerName}</Text>
                <Button title="X" onPress={() => props.removePlayerHandler(props.playerKey)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "#cccccc",
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: "center",
        width: "auto",
        elevation: 3,
        marginHorizontal: 10,
        marginTop: 0,
        paddingTop: 0
    },
    text: {
        margin: 10
    }
   
})