import React, { useEffect, useState } from 'react';
import { CategoryItem } from './CategoryItem';
import { useDatabase } from '../lib/useDatabase';
import { View, SafeAreaView, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Wrapper } from './Wrapper';

export const CategoryList = (props) => {
    const { getReference, deleteReference } = useDatabase();
    const [dataReference, setDataReference] = useState();

    useEffect(() => {
        getReference("/categories", setDataReference);

        return () => deleteReference("/categories");
    }, []);

    const renderCategoryItems = () => {
        if (dataReference) {
            return dataReference.map((category, index) => {
                return <CategoryItem navigation={props.navigation} key={index} category={category} categoryKey={index}></CategoryItem>
            })
        } return null;
    }

    return (
        <Wrapper style={{ backgroundColor: "white" }}>
            
                <View style={styles.background}>
                    <View style={styles.list}>
                        {/* {dataReference ? <CategoryItem category={dataReference.toString()}/> : null} */}
                        {renderCategoryItems()}
                    </View>
                </View>

        </Wrapper>
    )

};

const styles = StyleSheet.create({
    list: {
        justifyContent: "center",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
    },
    background: {
        flex: 1,
    }
});