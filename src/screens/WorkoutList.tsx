import {  Pressable, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';


const StyledText = styled(Text);
const StyledPressable = styled(Pressable);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);

const WorkoutList = () => {

  const muscleGroups = [
    'Abs','Back','Biceps','Calves','Chest','Forearms','Glutes','Hamstring','Quadriceps','Shoulders','Triceps',
  ];

  return (
    <StyledScrollView>
      {muscleGroups.map((group,index) => (
        <StyledPressable key={index} >
          <StyledText >{group}</StyledText>
          <StyledImage  source={require('../../assets/right.png')} />
        </StyledPressable>
      ))}
    </StyledScrollView>
  );
};

export default WorkoutList;
