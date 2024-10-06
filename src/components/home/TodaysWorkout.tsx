import { Text, View, FlatList, Pressable, Image } from 'react-native';
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
const StyledPress = styled(Pressable);
const StyledImg = styled(Image);

const TodaysWorkout = () => {

  const [todayWorkout,setTodayWorkout] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state

  const fetchWorkout = async () => {
    setIsLoading(true);
    const workout = await fetchTodayWorkout();
    // console.log('Work  : ',workout);
    setTodayWorkout(workout);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWorkout();
  }, []);

  const renderWorkoutItem = ({item}:{item: string}) => {
    return (
      <StyledText className="text-base text-white">  &#8227;   {item}</StyledText>
    );
  };

  return (
    <StyledView>
      <StyledView className="flex-row justify-between">
        <StyledText className="text-3xl font-bold text-white mb-5">Today's Workout</StyledText>
        <StyledPress onPress={fetchWorkout}>
          <StyledImg source={require('../../../assets/refresh.png')} className="w-6 h-6" />
        </StyledPress>
      </StyledView>

      {  isLoading ? (
          <StyledText className="text-lg font-bold text-white m-5">Loading...</StyledText>
        ) : (
          <>
            {todayWorkout && todayWorkout.length > 0 ?
              (
                <FlatList
                  data={todayWorkout}
                  renderItem={renderWorkoutItem}
                  keyExtractor={(item,index) => index.toString()}
                />
              ) : (
                <StyledText className="text-lg font-bold text-white">No workout done today</StyledText>
              )
            }
          </>
        )
      }
    </StyledView>
  );
};

export default TodaysWorkout;
