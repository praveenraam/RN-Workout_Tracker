import React from 'react';
import { Image, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import MuscleList from './screens/MusclesList';
import PerMuscleWorkedList from './screens/PerMuscleWorkList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView className="flex-1">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerLeft: () => (<Text className="text-xl font-bold text-black ml-2">Workout App</Text>),
              headerRight: () => (<Image source={require('../assets/calendar.png')} className="w-7 h-7 mr-2" />),
              headerTitle: '', // This removes the default title
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen name="Muscles List" component={MuscleList} />
          <Stack.Screen name="Muscle Workout List" component={PerMuscleWorkedList} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
