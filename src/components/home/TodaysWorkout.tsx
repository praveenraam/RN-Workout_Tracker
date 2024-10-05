import { Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styled } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../../utils/asyncStorageUtils';


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
      if(data && typeof data === 'object' && Array.isArray(data.workouts)){
        console.log(data);
        return data.workouts;
      }
    }
  }

  return null;
};


const StyledView = styled(View);
const StyledText = styled(Text);

const TodaysWorkout = () => {

  const [todayWorkout,setTodayWorkout] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      const workout = await fetchTodayWorkout();
      console.log('Work  : ',workout);
      setTodayWorkout(workout);
    };

    fetchWorkout();
  }, []);

  const renderWorkoutItem = ({item}:{item: Workout}) => {
    return (
      <StyledText className="text-base text-white">  &#8227;   {item}</StyledText>
    );
  };

  return (
    <StyledView className="mb-2">
      <StyledText className="text-3xl font-bold text-white mb-5">Today's Workout</StyledText>
      {todayWorkout && todayWorkout.length > 0 ?
        (
          <FlatList
            data={todayWorkout}
            renderItem={renderWorkoutItem}
            keyExtractor={(item,index) => index.toString()}
          />
        ):(
          <StyledText className="text-lg font-bold text-white">No workout done today</StyledText>
        )
      }
    </StyledView>
  );
};

export default TodaysWorkout;
