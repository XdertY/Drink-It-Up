import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ImageBackground } from 'react-native';

export const Wrapper = (props) => {
    return (
        // <SafeAreaView style={{...styles.background, ...props.style}}>
        <ImageBackground source={require('../assets/images/category_bg.jpg')} style={{
            height: null,
            width: '100%',
            resizeMode: "cover",
            overflow: "hidden",
            flex: 1
        }}>
            <ScrollView>
                {props.children}
            </ScrollView>
        </ImageBackground>
        // </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#4a536b",
        flex: 1,
    }
});
