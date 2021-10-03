import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, TextInput } from 'react-native';
import { Wrapper } from './Wrapper';
import LinearGradient from 'react-native-linear-gradient';
import { NameChip } from './NameChip';
import CustomText from './CustomText';

export const GamePreparationScreen = (props) => {
    const [name, setName] = useState("");
    const [names, setNames] = useState([]);
    const [nameChips, setNameChips] = useState([]);
    const [category, setCategory] = useState();

    const addPlayer = () => {
        if (name !== "") {
            setNames([...names, { key: names.length, name }]);
            setName("");
        }
    };

    const removePlayerHandler = (playerKey) => {
        setNames(names.reduce((acc, elem, index) => {
            if (elem.key !== playerKey) return [...acc, { key: index, name: elem.name }];
            return acc
        }, []))
    };

    useEffect(() => {
        if (names.length >= 0)
            setNameChips(names.map(el => <NameChip key={el.key} playerKey={el.key} playerName={el.name} removePlayerHandler={removePlayerHandler} />));
    }, [names])

    useEffect(() => {
        setCategory(props.navigation.state.params.category)
    }, [props.navigation]);


    return (
        <Wrapper>
            <View style={styles.contentContainer}>
                <CustomText style={styles.label}>First enter the players names: </CustomText>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Player name"
                />
                {/* <View style={styles.break}/> */}
                <Pressable style={styles.addPlayerButton} onPress={() => addPlayer()}>
                    <LinearGradient angle={180} colors={['#26CCC0', '#26CCC0']} style={styles.gradient}>
                        <CustomText style={styles.text}>{"+"}</CustomText>
                    </LinearGradient>
                </Pressable>

                <View style={styles.break} />
                {nameChips.length > 0 ? nameChips : null}
                <View style={styles.break} />

                <View style={{ ...styles.contentContainer, height: 100, maxHeight: 100, marginTop: 0 }}>

                    <Pressable style={styles.button} onPress={() => { props.navigation.goBack() }}>
                        <LinearGradient angle={180} colors={['#f8cb40', '#f8cb40']} style={styles.gradient}>
                            <CustomText style={styles.text}>{"Go Back"}</CustomText>
                        </LinearGradient>
                    </Pressable>

                    <Pressable style={styles.button} onPress={() => {
                        if (names.length > 0) {
                            props.navigation.navigate("Game", {
                                category,
                                names
                            });
                        }
                    }}>
                        <LinearGradient angle={180} colors={['#26CCC0', '#26CCC0']} style={styles.gradient}>
                            <CustomText style={styles.text}>{"Start"}</CustomText>
                        </LinearGradient>
                    </Pressable>
                </View>
            </View>
        </Wrapper>

    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "white",
        backgroundColor: "#384858",
        padding: 10,
        width: "70%",
        color: "white",
        paddingRight: 0,
        marginRight: 0,
        marginBottom: 0
    },
    label: {
        fontSize: 16,
        color: "white",
        width: "80%",
        fontWeight: "bold",
        textAlign: "center",
        marginRight: 80,
        paddingRight: 100
    },
    contentContainer: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    addPlayerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        width: "20%",
        height: 70,
        left: -30
    },
    gradient: {
        width: "40%",
        alignItems: 'center',
        justifyContent: 'center',
        height: "50%",
        borderRadius: 4,
        
    },
    text: {
        fontWeight: "bold",
        color: "white"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        
        width: "40%",
        height: "100%"
    },
    break: {
        flexBasis: "100%",
        height: 0
    },

});
