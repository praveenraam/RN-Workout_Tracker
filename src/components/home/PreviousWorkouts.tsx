import { FlatList, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { format, isAfter, subDays } from 'date-fns';

// Interface
import { Workout } from '../../screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../../utils/asyncStorageUtils';
interface WorkoutStructure {
  [date:string]:string[];
}

const getWorkout = async (): Promise<WorkoutStructure> => {
  console.log('Working');
  const today = new Date();
  const pastWeek = subDays(today,10);

  const keys = await AsyncStorage.getAllKeys();
  const allWorkouts:WorkoutStructure = {};


  for(const key of keys){
    const parseDate = new Date(key);

    if(isAfter(parseDate,pastWeek) || key === format(today,'yyyy-MM-dd')){
      const data = getData(key);
      if(data){
        allWorkouts[key] = JSON.parse(data);
      }
    }
  }
  console.log(allWorkouts);
  return allWorkouts;
};

export const previousWorkouts: Workout[] = [
  {
    id: '1',
    date: '2024-09-25',
    musclesWorked: ['Biceps', 'Back'],
    exercisesCount: 6,
    exercises: [
      'Lat Pulldown', 'CableRows', 'Dead Lift','T-Bar rows', 'Inclined Bicep curls', 'Preacher Curls',
    ],
  },
  {
    id: '2',
    date: '2024-09-20',
    musclesWorked: ['Chest', 'Triceps'],
    exercises: [
      'Inclined Dumbbell Press', 'Declined Dumbbell Press', 'Flat Dumbbell Press','Pec Decs','Skull Crusher', 'Triceps Push down',
    ],
    exercisesCount: 6,
  },
  {
    id: '3',
    date: '2024-09-19',
    musclesWorked: ['Legs'],
    exercisesCount: 5,
    exercises: [
      'Dead Lift', 'Squats', 'Leg Extension', 'Leg curl', 'Romanian Dead Lift',
    ],
  },
  {
    id: '4',
    date: '2024-09-12',
    musclesWorked: ['Legs'],
    exercisesCount: 5,
    exercises: [
      'Dead Lift', 'Squats', 'Leg Extension', 'Leg curl', 'Romanian Dead Lift',
    ],
  },
];

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);

export const formatDate = (dateString:string) =>{
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
};

const renderWorkoutItem = ({item}:{item: Workout})  => {
  return (
    <StyledView className="mb-2 p-4 border-b border-grey-300">
        <StyledText className="text-lg font-bold text-white">{formatDate(item.date)}</StyledText>
        <StyledText className="font-bold text-xl text-white">Muscle Worked : {item.musclesWorked.join(', ')}</StyledText>
        <StyledText className="font-bold text-white">Number of Exercises : {item.exercisesCount}</StyledText>
    </StyledView>
  );
};

const PreviousWorkouts = () => {

  return (
    <>
      <StyledText className="text-lg font-bold text-white">Previous Day Workouts</StyledText>
      <StyledScrollView>
        <FlatList
          data={previousWorkouts}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item.id}
        />
      </StyledScrollView>
    </>
  );
};

export default PreviousWorkouts;
