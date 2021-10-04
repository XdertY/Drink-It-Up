import React, { useEffect, useState } from 'react';
import { CategoryList } from './components/CategoryList'
import { createAppContainer } from 'react-navigation';
import { CategoryDetails } from './components/CategoryDetails';
import { createStackNavigator } from 'react-navigation-stack';
import { GamePreparationScreen } from './components/GamePreparationScreen';
import { Game } from './components/Game';
import { Provider } from 'react-redux';
import store from './store'

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Animated,
  Easing,
  Platform
} from 'react-native';

const Home = (props) => {
  return (
    <CategoryList navigation={props.navigation} />
  );
};

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1]),
  });

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  };
};

let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
};


const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: SlideFromRight(index, position, width),
      }[transition];
    },
  }
}

const Navigator = createAppContainer(createStackNavigator(
  {
    Home: { screen: Home },
    CategoryDetails: { screen: CategoryDetails },
    GamePreparationScreen: { screen: GamePreparationScreen },
    Game: { screen: Game }
  },
  {
    initialRouteName: 'GamePreparationScreen',
    headerMode: 'none'
  }
));

const App = () => {
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  )
}


export default App
