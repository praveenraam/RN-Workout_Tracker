import { Pressable, View, Text, Image } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';

// Components
import PreviousWorkouts from '../components/home/PreviousWorkouts';
import TodaysWorkout from '../components/home/TodaysWorkout';

// Elements Styled
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);
const StyledImage = styled(Image);

// Interface
export interface Workout {
  id: string;
  date:string;
  musclesWorked: string[];
  exercisesCount:number;
  exercises:string[],
}

const Home = () => {

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Muscles List');
  };

  return (
    <StyledView className="p-4 w-full h-full bg-black">
      <TodaysWorkout />

      <StyledView className="h-[1px] bg-gray-400 my-4" />

      <PreviousWorkouts />
      <StyledPressable onPress={handlePress} className="bg-violet-600 p-4 absolute bottom-0 right-0 left-0 flex-row items-center justify-between">
        <StyledText className="text-2xl font-bold text-white ">Proceed to Workout</StyledText>
        <StyledImage source={require('../../assets/right.png')} className="w-10 h-10 "/>
      </StyledPressable>
    </StyledView>
  );
};

export default Home;
