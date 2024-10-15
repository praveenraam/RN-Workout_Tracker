import { Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { styled } from 'nativewind';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledPicker = styled(Picker);
const StyledPressable = styled(Pressable);
const StyledScrollView = styled(ScrollView);


const NewWorkout = () => {

  const [workoutName,setWorkoutName] = useState<string>('');
  const [equipment,setEquipment] = useState<string>('');
  const [muscleWorked,setMuslceWorked] = useState<string>('');

  const muscleGroups = ['Back','Biceps','Leg','Shoulders','Triceps','Chest'];

  return (
    <StyledScrollView className="bg-grey">
      <StyledView>
        <StyledText className="text-white">WorkoutName</StyledText>
        <StyledTextInput
          className="bg-grey-800 text-white"
          placeholder="Enter workout Name"
          placeholderTextColor="#888"
          value={workoutName}
        />
      </StyledView>

      <StyledView>
        <StyledText>Muscle Worked</StyledText>
        <StyledPicker>
          <StyledPicker.Item label="Select muscle group" value="" />
          {muscleGroups.map((group, index) => (
            <StyledPicker.Item key={index} label={group} value={group} />
          ))}
        </StyledPicker>
      </StyledView>

      <StyledView>
        <StyledText className="text-white">Equipment required</StyledText>
        <StyledTextInput
          placeholder="Enter the Equipment required"
          placeholderTextColor="#888"
          value={muscleWorked}
        />
      </StyledView>

      <StyledPressable className="bg-white item-centre">
        <StyledText className="text-black">Add Workout</StyledText>
      </StyledPressable>

    </StyledScrollView>
  );
};

export default NewWorkout;
