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

    useEffect(() => {
        setCategory(props.navigation.state.params.category);
        setPlayerNames(props.navigation.state.params.names);
    }, [props.navigation]);


    // useEffect(() => {
    //     getReference(`/categories/${props.category}`, setDataReference);
    //     return () => deleteReference(`/categories/${props.category}`);
    // }, [])

    useEffect(() => {
        console.log(category)
        if(category && playerNames) {
            const gameQuestions = generateGameQuestions(category.questions, playerNames);
            console.log("The generated questions are: ", gameQuestions);
            setQuestions(gameQuestions);
            setQuestionElements(gameQuestions.map((el, index) => <CustomText key={index}>{el.type + "    " + el.question}</CustomText>))
        }
    }, [category, playerNames])

    return (
        <Wrapper>
            {questionElements.length > 0 ? questionElements : null}
            <Button onPress={() => props.navigation.goBack()} title="Go Back"/>
        </Wrapper>
    )
}