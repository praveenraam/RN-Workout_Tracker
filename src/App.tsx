import React from 'react';
import Home from './screens/Home';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MuscleList from './screens/MusclesList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Muscles List" component={MuscleList} />
        {/* <Stack.Screen name="MuscleWorkoutList" */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
