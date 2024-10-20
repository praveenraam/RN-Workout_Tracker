import { Text, View, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { styled } from 'nativewind';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

  const muscleGroups = ['Back','Biceps','Legs','Shoulders','Triceps','Chest'];

  const handlePress = async () => {
    console.log('Workout Name : ', workoutName);
    console.log('Equipment : ',equipment);
    console.log('Muscle : ',muscleWorked);

    if(workoutName && equipment && muscleWorked){
      let name = workoutName;
      const newWorkoutData = {name, equipment, muscleWorked};

      try{
        const excistingData = await AsyncStorage.getItem(muscleWorked);
        const parseData = excistingData ? JSON.parse(excistingData) : [];

        const updatedData = [...parseData,newWorkoutData];

        await AsyncStorage.setItem(muscleWorked,JSON.stringify(updatedData));
        Alert.alert('Successful','Workout has been added');

      }
      catch(error){
        Alert.alert('Error','Failed to add the new Workout');
      }
    }
    else{
      Alert.alert('Validation Error','Fill the details properly');
    }

    // Reset to default
    setWorkoutName('');
    setMuslceWorked('');
    setEquipment('');
  };

  return (
    <StyledScrollView className="flex-1 bg-black p-5">
      <StyledView className="mb-4">
        <StyledText className="text-white text-xl mb-2">WorkoutName</StyledText>
        <StyledTextInput
          className="bg-gray-800 text-white p-3 rounded-lg"
          placeholder="Enter workout Name"
          placeholderTextColor="#fff"
          value={workoutName}
          onChangeText={setWorkoutName}
        />
      </StyledView>

      <StyledView className="mb-4">
        <StyledText className="text-white text-xl mb-2">Muscle Worked</StyledText>
        <StyledPicker
          selectedValue={muscleWorked}
          onValueChange={(itemValue) => setMuslceWorked(itemValue)}
          className="bg-gray-800 text-white rounded-lg"
        >
          <StyledPicker.Item label="Select muscle group" value="" />
          {muscleGroups.map((group, index) => (
            <StyledPicker.Item key={index} label={group} value={group} />
          ))}
        </StyledPicker>
      </StyledView>

      <StyledView className="mb-4">
        <StyledText className="text-white text-xl mb-2">Equipment required</StyledText>
        <StyledTextInput
          className="rounded-lg bg-gray-800 text-white p-3"
          placeholder="Enter the Equipment required"
          placeholderTextColor="#fff"
          value={equipment}
          onChangeText={setEquipment}
        />
      </StyledView>

      <StyledPressable
        className="bg-violet-600 p-4 rounded-lg mt-5"
        onPress={handlePress}
      >
        <StyledText className="text-white text-center">Add Workout</StyledText>
      </StyledPressable>

    </StyledScrollView>
  );
};

export default NewWorkout;
