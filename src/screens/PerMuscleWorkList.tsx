import { Alert, Image, Text, View, ScrollView, Pressable, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styled } from 'nativewind';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getData, saveData } from '../utils/asyncStorageUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
//
const StyledImage = styled(Image);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

//
type Param = {
  Muscle:{
    muscleName:string;
  }
}

const PerMuscleWorkedList = () => {

  const [workoutList,setWorkoutList] = useState<any[]>([]);

  const getImage = (Muscle:string) => {
    if(Muscle === 'Back'){
      return require('../../assets/WorkoutList/Back.webp');
    }
    else if(Muscle === 'Biceps'){
      return require('../../assets/WorkoutList/Biceps.webp');
    }
    else if(Muscle === 'Chest'){
      return require('../../assets/WorkoutList/Chest.webp');
    }
    else if(Muscle === 'Legs'){
      return require('../../assets/WorkoutList/Quadriceps.webp');
    }
    else if(Muscle === 'Shoulders'){
      return require('../../assets/WorkoutList/Shoulders.webp');
    }
    else if(Muscle === 'Triceps'){
      return require('../../assets/WorkoutList/Triceps.webp');
    }
  };

  const getWorkout = (muscle: string) => {

      if(muscle === 'Back'){
        return require('../workoutData/Back.json');
      }
      else if(muscle === 'Biceps'){
        return require('../workoutData/Biceps.json');
      }
      else if(muscle === 'Chest'){
        return require('../workoutData/Chest.json');
      }
      else if(muscle === 'Legs'){
        return require('../workoutData/Leg.json');
      }
      else if(muscle === 'Shoulders'){
        return require('../workoutData/Shoulders.json');
      }
      else if(muscle === 'Triceps'){
        return require('../workoutData/Triceps.json');
      }
    };

  const route = useRoute<RouteProp<Param,'Muscle'>>();
  const muscleName = route.params.muscleName;

  // Store workout like this
  const handleSaveWorkout = async (newWorkoutName: string) => {
    try {
      const dateKey = new Date().toISOString().split('T')[0];
      let updatedWorkout;

      const existingData = await getData(dateKey);

      if (existingData) {

        const workoutsList = existingData.workouts || [];

        if(!workoutsList.includes(newWorkoutName)){
          updatedWorkout = {
            ...existingData,
            workouts: [...(existingData.workouts || []), newWorkoutName],
          };

          await saveData(updatedWorkout);
          Alert.alert(
            'Workout Added',
            `${newWorkoutName} successfully added!`,
            [{text:'OK',onPress: () => console.log('OK Pressed')}]
          );
          console.log('Workout saved successfully');
        }
        else{
          Alert.alert(
            'Duplicate Entry',
            'This workout already added.',
            [{text:'OK',onPress: () => console.log('OK Pressed')}]
          );
          console.log('workout is already exist');
        }
      } else {
        updatedWorkout = {
          workouts: [newWorkoutName],
        };
        await saveData(updatedWorkout);
        Alert.alert(
          'Workout Added',
          `${newWorkoutName} successfully added!`,
          [{text:'OK',onPress: () => console.log('OK Pressed')}]
        );
        console.log('workout saved successfully');
      }
    } catch (error) {
      console.log('Error saving workout', error);
    }
  };

  const getDataFromAsync = async (muscle: string) => {
    return await AsyncStorage.getItem(muscle);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Get workouts from getWorkout function
      const workouts = getWorkout(muscleName);

      // Get data from AsyncStorage and append it to workouts
      const asyncData = await getDataFromAsync(muscleName);
      console.log('data',muscleName,'',asyncData);

      if (asyncData) {
        const parsedData = JSON.parse(asyncData);
        setWorkoutList([...workouts, ...parsedData]);
      } else {
        setWorkoutList(workouts);
      }
    };

    fetchData();
  }, [muscleName]);

  return (
    <StyledScrollView className="bg-black h-screen">
      <StyledImage className="w-full h-80 mb-5" source={getImage(muscleName)} />

      <StyledView className="flex flex-row ">
        <StyledView className="w-[10%] flex justify-center items-center">
        <StyledView className="w-[3px] bg-gray-400 mx-4 h-full" />
      </StyledView>

        <StyledScrollView className="text-white">
          <StyledView>
            {/* Rendering Data */}
            <FlatList
              data={workoutList}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <StyledView className="flex flex-row items-center justify-between mb-3">
                  <StyledView className="flex-1">
                    <StyledText key={item.no} className="text-xl font-bold text-white">{item.name}</StyledText>
                    <StyledText className="text-sm text-white mb-3">Equipment : {item.equipment}</StyledText>
                  </StyledView>
                  <Pressable onPress={() => handleSaveWorkout(item.name)}>
                    <StyledImage className="w-7 h-7 right-3" source={require('../../assets/plus.png')} />
                  </Pressable>
                </StyledView>
              )}
            />

          </StyledView>
        </StyledScrollView>
      </StyledView>
    </StyledScrollView>
  );
};

export default PerMuscleWorkedList;
