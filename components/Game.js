import React, { useRef, useEffect, useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { useDatabase } from '../lib/useDatabase';
import { Wrapper } from './Wrapper';
import { generateGameQuestions } from '../lib/questionDistributionGenerator';
import CustomText from './CustomText';
import { QuestionCard } from './QuestionCard'
import { GameOverCard } from './GameOverCard';

export const Game = (props) => {
    const [category, setCategory] = useState();
    const [playerNames, setPlayerNames] = useState();
    const [questions, setQuestions] = useState();
    const [questionCards, setQuestionCards] = useState([]);
    const [visitedQuestionCards, setVisitedQuestionCards] = useState([]);
    const { getReference, deleteReference } = useDatabase();
    const [switchToNextCardFlag, setSwitchToNextCardFlag] = useState(null);

    useEffect(() => {
        getReference(`/categories/${props.navigation.state.params.category.key}`, setCategory);
        setPlayerNames(JSON.parse(JSON.stringify(props.navigation.state.params.names)));
    }, [props.navigation]);


    useEffect(() => {
        return () => deleteReference(`/categories/${props.navigation.state.params.category.key}`);
    }, [])

    useEffect(() => {
        if (category !== undefined && playerNames !== undefined && playerNames.length > 0) {
            const gameQuestions = generateGameQuestions(category.questions, playerNames);
            if (gameQuestions !== "error") {
                setQuestions(gameQuestions);
                setQuestionCards(gameQuestions.map((el, index) => {
                    return <QuestionCard question={el} next={setSwitchToNextCardFlag}/>;
                }))
            }
        }
    }, [category, playerNames])

    useEffect(() => {
        if(switchToNextCardFlag !== null) {
            switchToNextCard();
        }

    } , [switchToNextCardFlag])

    const switchToNextCard = () => {
        if(questionCards.length === 1) props.navigation.goBack();
        const tempQuestionCards = [...questionCards];
        const visitedQuestionCard = tempQuestionCards.shift();
        const newVisitedQuestionCards = visitedQuestionCards;
        newVisitedQuestionCards.push(visitedQuestionCard);
        setQuestionCards(tempQuestionCards);
        setVisitedQuestionCards(newVisitedQuestionCards);
    }

    return (
        
        <View style={{ display: "flex", flex: 1, height: '100%'}}>
            {questionCards.length > 0 ? questionCards[0] : null}
        </View>
    )
}