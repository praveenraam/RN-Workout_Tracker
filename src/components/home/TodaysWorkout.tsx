import { Text, View, FlatList } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../../utils/asyncStorageUtils';

import { WorkoutStructure } from './PreviousWorkouts';


const getTodayDate = (): string => {
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0];
  return todayDate;
};

const normalizeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const normalized = date.toISOString().split('T')[0];
  return normalized;
};

const fetchTodayWorkout = async (): Promise<string[] | null> => {
  const keys = await AsyncStorage.getAllKeys();
  const todayDate = getTodayDate();

  for(const key of keys){
    const normalizedKey = normalizeDate(key);

    if(normalizedKey === todayDate){
      const data = await getData(key);
      if(data && Array.isArray(data)){
        return data;
      }
    }
  }

  return null;
};


const StyledView = styled(View);
const StyledText = styled(Text);

const TodaysWorkout = () => {

  const renderWorkoutItem = ({item}:{item: Workout}) => {
    return (
      <StyledView>

        <StyledText className="font-bold texttext-xl text-white">Muscle Worked : {item.musclesWorked.join(', ')}</StyledText>
        <StyledText className="font-bold text-white">Number of Exercises : {item.exercisesCount}</StyledText>

        <StyledView>

          <StyledText className="font-bold text-black my-3 text-xl text-white">Exercises : </StyledText>
          {item.exercises.map((exercise,index)=>(
            <StyledText className="text-black text-base	text-white" key={index}> &#8227;  {exercise}</StyledText>
          ))}
        </StyledView>

      </StyledView>
    );
  };

  return (
    <StyledView className="mb-2">
      <StyledText className="text-3xl font-bold text-black mb-5 text-white">Today's Workout</StyledText>

      {todayWorkout.length > 0 ?
        (<FlatList data={todayWorkout}
          renderItem={renderWorkoutItem}
          keyExtractor={(item)=>item.id}
          horizontal={true}
        />) : (
          <StyledText className="text-lg font-bold text-white">No workout done today</StyledText>
        )
      }
    </StyledView>

  );
};

export default TodaysWorkout;
