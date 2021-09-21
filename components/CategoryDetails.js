import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, Button, StyleSheet, Pressable } from 'react-native';
import { Wrapper } from './Wrapper';
import { useDatabase } from '../lib/useDatabase';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';

export const CategoryDetails = (props) => {
    const [screenProps, setScreenProps] = useState(props.navigation.state);
    const [category, setCategory] = useState();

    useEffect(() => {
        setScreenProps(props.navigation.state.params);
        setCategory(props.navigation.state.params.category)
    }, [props.navigation]);

    return (
        <Wrapper>
            {category ?
                <View style={styles.mainContainer}>

                    {/* {dataReference ? <CategoryItem category={dataReference.toString()}/> : null} */}
                    <Text style={styles.title}>{category.name}</Text>
                    <View style={styles.contentContainer}>
                        {category ? <Text style={styles.description}>{category.description}</Text> : null}
                        <View style={styles.verticalLine} />
                        {category ? <Text style={styles.description}>{category.description}</Text> : null}

                    </View>
                    {/* <View style={styles.break} /> */}

                    <View style={{...styles.contentContainer , height: 100, maxHeight: 100}}>
                        <Pressable style={styles.button} onPress={() => { props.navigation.goBack() }}>
                            <LinearGradient angle={180} colors={['#f8cb40', '#f8cb40']} style={styles.gradient}>
                                <CustomText style={styles.text}>{"Go Back"}</CustomText>
                            </LinearGradient>
                        </Pressable>

                        <Pressable style={styles.button} onPress={() => { 
                            props.navigation.navigate("GamePreparationScreen", {
                                category
                            });
                         }}>
                            <LinearGradient angle={180} colors={['#26CCC0', '#26CCC0']} style={styles.gradient}>
                                <CustomText style={styles.text}>{"Play"}</CustomText>
                            </LinearGradient>
                        </Pressable>

                    </View>
                    {/* <Button title={"Go back"} onPress={() => { props.navigation.goBack() }}></Button> */}

                </View>
                : null}
        </Wrapper>

    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Lobster-Regular',
        fontSize: 32,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
    },
    mainContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 20
    },
    contentContainer: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    description: {
        fontSize: 16,
        width: "45%",
        textAlign: "center",
        color: "white"
    },
    break: {
        flexBasis: "100%",
        height: 0
    },
    verticalLine: {
        height: '100%',
        width: 3,
        backgroundColor: '#909090',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        width: "40%",
        height: "100%"
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        paddingHorizontal: 10
    },
    gradient: {
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center',
        height: "50%",
        borderRadius: 4,
        elevation: 3,
    }
});