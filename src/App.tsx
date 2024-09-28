import React from 'react';
import Home from './screens/Home';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MuscleList from './screens/MusclesList';
import PerMuscleWorkedList from './screens/PerMuscleWorkList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView className="flex-1">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Muscles List" component={MuscleList} />
          <Stack.Screen name="Muscle Workout List" component={PerMuscleWorkedList} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
