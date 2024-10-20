import {  Pressable, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MuscleWorkoutList: { muscleName: string };
};

type MuscleListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MuscleWorkoutList'>;


const StyledText = styled(Text);
const StyledPressable = styled(Pressable);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);

const MuscleList = () => {

  const muscleGroups = [
    'Back','Biceps','Chest','Shoulders','Triceps','Legs',
  ];

  const navigation = useNavigation<MuscleListScreenNavigationProp>();

  const handleNewWorkoutNavigation = () => {
    navigation.navigate('New Workout');
  };

  const handleNavigation = (group:string) => {
    navigation.navigate('Muscle Workout List',{ muscleName:group });
  };

  return (
    <>
    <StyledScrollView className="w-full h-full bg-black">
      {muscleGroups.map((group,index) => (
        <StyledPressable key={index} onPress={() => handleNavigation(group)} className="bg-violet-600 mt-5 mx-4 p-4 rounded-2xl flex-row items-center justify-between">
          <StyledText className="text-xl mx-5 text-white">{group}</StyledText>
          <StyledImage className="w-9 h-9" source={require('../../assets/right.png')} />
        </StyledPressable>
      ))}
    </StyledScrollView>
    <StyledPressable onPress={handleNewWorkoutNavigation} className="bg-violet-600 p-4 absolute bottom-0 right-0 left-0 flex-row items-center justify-between">
        <StyledText className="text-2xl font-bold text-white ">Add a new workout</StyledText>
        <StyledImage source={require('../../assets/right.png')} className="w-10 h-10 "/>
      </StyledPressable>
    </>
  );
};

export default MuscleList;
