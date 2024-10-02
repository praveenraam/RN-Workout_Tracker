import { FlatList, Text, View, ScrollView } from 'react-native';
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
  today.setHours(0, 0, 0, 0); // Set to start of the day to avoid including today
  const pastWeek = subDays(today, 10); // Included 10 days as the rest days are excluded and minimum 7 session were shown

  const keys = await AsyncStorage.getAllKeys();
  const allWorkouts: WorkoutStructure = {};

  for (const key of keys) {
    const parseDate = new Date(key);
    parseDate.setHours(0, 0, 0, 0); // Set to start of the day to avoid time issues

    if (parseDate > pastWeek && parseDate < today) {
      try {
        const data = await getData(key);

        if (data && typeof data === 'object') {
          allWorkouts[key] = data;
        }
      } catch (error) {
        console.error('Error retrieving data for key:', key, error);
      }
    }
  }

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

const renderWorkoutItem = ({ item }: { item: [string, { workouts: string[] }] }) => {
  const [date, exercisesObject] = item;

  const exercisesList = exercisesObject && Array.isArray(exercisesObject.workouts)
    ? exercisesObject.workouts.join(', ')
    : 'No exercises done';

    return (
      <StyledView className="mb-1 p-2 px-4 border-b border-grey-300">
        <StyledText className="text-lg font-bold text-white mb-2">{formatDate(date)}</StyledText>
        <StyledText className="font-bold text-2xl text-white ">
          Workouts Done :
        </StyledText>
        <StyledText className="text-lg text-white">
          {exercisesList}
        </StyledText>
        <StyledView className="h-[0.5px] bg-gray-400 mt-4" />
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

  // Sorted in opposite order
  const workoutArray = workouts ? Object.entries(workouts).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()) : [];

  return (
    <>
      <StyledText className="text-lg font-bold text-white">Previous Day Workouts</StyledText>
      <StyledScrollView>
        <FlatList
          data={workoutArray}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item[0]}
        />
      </StyledScrollView>
    </>
  );
};

export default PreviousWorkouts;
