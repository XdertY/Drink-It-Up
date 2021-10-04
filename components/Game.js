import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDatabase } from '../lib/useDatabase';
import { generateGameQuestions } from '../lib/questionDistributionGenerator';
import { QuestionCard } from './QuestionCard';
import { useSelector } from 'react-redux';

export const Game = (props) => {
    const names = useSelector(state => state.names);
    const category = useSelector(state => state.category);
    // const [playerNames, setPlayerNames] = useState();
    // const [questions, setQuestions] = useState();
    const [questionCards, setQuestionCards] = useState([]);
    const [visitedQuestionCards, setVisitedQuestionCards] = useState([]);
    // const { getReference, deleteReference } = useDatabase();
    const [switchToNextCardFlag, setSwitchToNextCardFlag] = useState(null);

    // useEffect(() => {
    //     getReference(`/categories/${category.key}`, setCategory);
    //     setPlayerNames(JSON.parse(JSON.stringify(names)));
    // }, [props.navigation]);


    // useEffect(() => {
    //     return () => deleteReference(`/categories/${category.key}`);
    // }, [])

    useEffect(() => {
        if (category !== undefined && names !== undefined && names.length > 0) {
            const categoryQuestions = JSON.parse(JSON.stringify(category.questions));
            const playerNames = JSON.parse(JSON.stringify(names));
            const gameQuestions = generateGameQuestions(categoryQuestions, playerNames);
            if (gameQuestions !== "error") {
                // setQuestions(gameQuestions);
                setQuestionCards(gameQuestions.map((el, index) => {
                    return <QuestionCard question={el} next={setSwitchToNextCardFlag}/>;
                }))
            }
        }
    }, [category, names])

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