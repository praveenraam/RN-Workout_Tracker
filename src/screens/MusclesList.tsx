import {  Pressable, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';


const StyledText = styled(Text);
const StyledPressable = styled(Pressable);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);

const MuscleList = () => {

  const muscleGroups = [
    'Back','Biceps','Chest','Shoulders','Triceps','Legs',
  ];

  return (
    <StyledScrollView className="w-full h-full bg-black">
      {muscleGroups.map((group,index) => (
        <StyledPressable key={index} className="bg-violet-600 mt-5 mx-4 p-4 rounded-2xl flex-row items-center justify-between">
          <StyledText className="text-xl mx-5 text-white">{group}</StyledText>
          <StyledImage className="w-9 h-9" source={require('../../assets/right.png')} />
        </StyledPressable>
      ))}
    </StyledScrollView>
  );
};

export default MuscleList;
