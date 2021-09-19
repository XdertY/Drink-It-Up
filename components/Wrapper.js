import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export const Wrapper = (props) => {
    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                {props.children}
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#4a536b",
        flex: 1,
      }
});
