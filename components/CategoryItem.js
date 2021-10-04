import React from 'react';
import { Text, TouchableWithoutFeedback, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { actions } from '../store';
import { useDispatch } from 'react-redux';

export const CategoryItem = (props) => {
    const dispatch = useDispatch();

    const startTransition = () => {
        dispatch(actions.selectCategory( {...props.category, key: props.categoryKey}))
        props.navigation.navigate("CategoryDetails");
    }

    const getColors = () => {
        index = props.categoryKey + 1; 
        if(index % 4 === 1 || index % 4 === 0) return ['#f8cb40', '#f8cb40']
        return ['#26CCC0', '#26CCC0']
    }
 
    return (
        <View style={{...styles.card}}>

            <TouchableWithoutFeedback onPress={() => startTransition()}>
                <LinearGradient colors={getColors()} style={styles.gradient}>
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
        width: `40%`,
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
        color: "white",
        fontSize: 25
    }

})


