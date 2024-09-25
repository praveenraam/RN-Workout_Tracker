import React from 'react';
import Home from './screens/Home';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutList from './screens/WorkoutList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Workout_List" component={WorkoutList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
