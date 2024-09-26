import { Text, View, FlatList } from 'react-native';
import React from 'react';
import { previousWorkouts } from './PreviousWorkouts';
import { styled } from 'nativewind';

import { Workout } from '../../screens/Home';


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

const todayWorkout = previousWorkouts.filter(workout => {
  const normalizedWorkoutDate = normalizeDate(workout.date);
  const todayDate = getTodayDate();
  return normalizedWorkoutDate === todayDate;
});

const StyledView = styled(View);
const StyledText = styled(Text);

const TodaysWorkout = () => {

  const renderWorkoutItem = ({item}:{item: Workout}) => {
    return (
      <StyledView>

        <StyledText className="font-bold text-xl">Muscle Worked : {item.musclesWorked.join(', ')}</StyledText>
        <StyledText className="font-bold">Number of Exercises : {item.exercisesCount}</StyledText>

        <StyledView>

          <StyledText className="font-bold text-black my-3 text-xl">Exercises : </StyledText>
          {item.exercises.map((exercise,index)=>(
            <StyledText className="text-black text-base" key={index}> &#8227;  {exercise}</StyledText>
          ))}
        </StyledView>

      </StyledView>
    );
  };

  return (
    <StyledView className="mb-2">
      <StyledText className="text-lg font-bold text-black mb-5">Today's Workout</StyledText>

      {todayWorkout.length > 0 ?
        (<FlatList data={todayWorkout}
          renderItem={renderWorkoutItem}
          keyExtractor={(item)=>item.id}
          horizontal={true}
        />) : (
          <StyledText className="text-2xl font-bold">Not worked today</StyledText>
        )
      }
    </StyledView>

  );
};

export default TodaysWorkout;
