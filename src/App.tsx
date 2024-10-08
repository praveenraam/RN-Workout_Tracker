import React from 'react';
import { Image, Text, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import MuscleList from './screens/MusclesList';
import PerMuscleWorkedList from './screens/PerMuscleWorkList';
import CalendarScreen from './screens/CalendarScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView className="flex-1">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerLeft: () => (<Text className="text-xl font-bold text-black ml-2">Workout App</Text>),
              headerRight: () => ( 
              <Pressable onPress={() => navigation.navigate('Calendar')}>
                <Image 
                  source={require('../assets/calendar.png')} 
                  className="w-7 h-7 mr-2" 
                />
              </Pressable>),
              headerTitle: '', // This removes the default title
              headerTitleAlign: 'center',
            })}
          />
          <Stack.Screen name="Muscles List" component={MuscleList} />
          <Stack.Screen name="Muscle Workout List" component={PerMuscleWorkedList} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
