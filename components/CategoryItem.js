import React, { useRef } from 'react';
import { Text, TouchableWithoutFeedback, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export const CategoryItem = (props) => {

    const startTransition = () => {
        props.navigation.navigate("CategoryDetails", {
            category: {...props.category, key: props.categoryKey}
        });
    }
 
    return (
        <View style={{...styles.card}}>

            <TouchableWithoutFeedback onPress={() => startTransition()}>
                <LinearGradient colors={['#ff9a8d', '#aed6dc']} style={styles.gradient}>
                    <Text style={styles.category}>{props.category.name}</Text>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </View>

    )
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        minHeight: 200,
        width: `50%`,
    },
    gradient: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "white",
        flex: 1,
    },
    category: {
        fontFamily: 'Lobster-Regular',
        fontSize: 32,
        fontWeight: "bold",
        color: "gray",
        fontSize: 25
    }

})


