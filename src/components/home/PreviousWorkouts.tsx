import { FlatList, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styled } from 'nativewind';
import { format, isAfter, subDays } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../../utils/asyncStorageUtils';

// Interface
import { Workout } from '../../screens/Home';

interface WorkoutStructure {
  [date:string]:string[];
}

const getWorkout = async (): Promise<WorkoutStructure> => {
  const today = new Date();
  const pastWeek = subDays(today, 10);

  const keys = await AsyncStorage.getAllKeys();  // Get all stored keys
  const allWorkouts: WorkoutStructure = {};

  for (const key of keys) {
    const parseDate = new Date(key);

    if (isAfter(parseDate, pastWeek) || key === format(today, 'yyyy-MM-dd')) {
      try {
        const data = await getData(key);  // Await the async getData call

        if (data && typeof data === 'object') {
          // Since data is already an object, directly assign it
          allWorkouts[key] = data;
        } else {
          console.log('Data for key', key, 'is not a valid object:', data);
        }
      } catch (error) {
        console.error('Error retrieving data for key:', key, error);
      }
    }
  }

  console.log('Workouts from the last 7 days:', allWorkouts);
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
const StyledPress = styled(Pressable);

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

  const [workouts,setWorkouts] = useState<WorkoutStructure | null>(null);

  useEffect(()=>{

    const fetch = async () => {
      const retrievedWorkout = await getWorkout();
      setWorkouts(retrievedWorkout);
    };

    fetch();
  },[]);

  return (
    <>
      <StyledText className="text-lg font-bold text-white">Previous Day Workouts</StyledText>
      <StyledPress onPress={getWorkout}>
        <StyledText className='text-white'>Click</StyledText>
      </StyledPress>
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
