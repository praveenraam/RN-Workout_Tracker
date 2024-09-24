import { Text, View, FlatList } from 'react-native';
import React from 'react';
import { formatDate, previousWorkouts } from './PreviousWorkouts';
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

        <StyledText>{formatDate(item.date)}</StyledText>
        <StyledText>Muscle Worked : {item.musclesWorked.join(', ')}</StyledText>
        <StyledText>Number of Exercises : {item.exercisesCount}</StyledText>

        <StyledView>

          <StyledText>Exercises : </StyledText>
          {item.exercises.map((exercise,index)=>(
            <StyledText key={index}>- {exercise}</StyledText>
          ))}
        </StyledView>

      </StyledView>
    );
  };

  return (
    <StyledView>
      <StyledText>Today's Workout</StyledText>

      {todayWorkout.length > 0 ?
        (<FlatList data={todayWorkout}
          renderItem={renderWorkoutItem}
          keyExtractor={(item)=>item.id}
          horizontal={true}
        />) : (
          <StyledText>NO workout today</StyledText>
        )
      }
    </StyledView>

  );
};

export default TodaysWorkout;
