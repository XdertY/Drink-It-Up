import React, { useRef, useEffect, useState } from 'react';
import { Button } from 'react-native';
import { useDatabase } from '../lib/useDatabase';
import { Wrapper } from './Wrapper';
import { generateGameQuestions } from '../lib/questionDistributionGenerator';
import CustomText from './CustomText';

export const Game = (props) => {
    const [category, setCategory] = useState();
    const [playerNames, setPlayerNames] = useState();
    const [questions, setQuestions] = useState();
    const [questionElements, setQuestionElements] = useState([]);
    const { getReference, deleteReference } = useDatabase();

    useEffect(() => {
        // console.log("We are in the component - navigation")
        getReference(`/categories/${props.navigation.state.params.category.key}`, setCategory);
        setPlayerNames(JSON.parse(JSON.stringify(props.navigation.state.params.names)));
        console.log("The parsed names are: ", JSON.parse(JSON.stringify(props.navigation.state.params.names)));
    }, [props.navigation]);


    useEffect(() => {
        // getReference(`/categories/${props.category}`, setDataReference);
        return () => deleteReference(`/categories/${props.navigation.state.params.category.key}`);
    }, [])

    useEffect(() => {
        // console.log("We are logging the category ", category);
        // console.log("We are logging the playerNames ", playerNames);
        // console.log("Combined effect ", category, playerNames);
        if(category !== undefined && playerNames !== undefined && playerNames.length > 0) {
            // console.log('category and playerNames are not undefined')
            const gameQuestions = generateGameQuestions(category.questions, playerNames);
            if(gameQuestions !== "error") {
                setQuestions(gameQuestions);
                setQuestionElements(gameQuestions.map((el, index) => <CustomText key={index}>{el.type + "    " + el.question}</CustomText>))

            }
            // console.log("The generated questions are: ", gameQuestions);
        }
    }, [category, playerNames])

    // useEffect(() => {
    //     console.log("Names effect: ", playerNames)
    // }, [playerNames])

    // useEffect(() => {
    //     console.log("Category effect: ", category)
    // }, [category])


    return (
        <Wrapper>
            {questionElements.length > 0 ? questionElements : null}
            <Button onPress={() => props.navigation.goBack()} title="Go Back"/>
        </Wrapper>
    )
}