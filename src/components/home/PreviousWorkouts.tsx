import { FlatList, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styled } from 'nativewind';
import { subDays } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../../utils/asyncStorageUtils';

// Interface for the workout structure
export interface WorkoutStructure {
  [date: string]: string[];
}

const muscleData = require('../../workoutData/muscleNames.json');

const getWorkout = async (): Promise<WorkoutStructure> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const pastWeek = subDays(today, 10);

  const keys = await AsyncStorage.getAllKeys();
  const allWorkouts: WorkoutStructure = {};

  for (const key of keys) {
    const parseDate = new Date(key);
    parseDate.setHours(0, 0, 0, 0);

    if (parseDate > pastWeek && parseDate < today) {
      try {
        const data = await getData(key);
        if (data && typeof data === 'object') {

          const muscleWorked = Array.from(
            new Set(
              data.workouts.map((workout: string) => muscleData[workout] || 'Unknown')
            )
          );

          allWorkouts[key] = { workouts: data.workouts, muscleWorked };
        }
      } catch (error) {
        console.error('Error retrieving data for key:', key, error);
      }
    }
  }

  return allWorkouts;
};

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
};

const renderWorkoutItem = ({ item }: { item: [string, { workouts: string[] }] }) => {
  const [date, exercisesObject] = item;
  const {workouts, muscleWorked} = exercisesObject;

  const exercisesList = exercisesObject && Array.isArray(exercisesObject.workouts)
    ? exercisesObject.workouts.join(', ')
    : 'No exercises done';

  const musclesWorkedList = muscleWorked.join(', ');

  return (
    <StyledView className="mb-1 p-2 px-4 border-b border-grey-300">

      <StyledText className="text-lg font-bold text-white mb-2">{formatDate(date)}</StyledText>
      <StyledText className="font-bold text-2xl text-white">
        Workouts Done:
      </StyledText>
      <StyledText className="text-lg text-white mb-2">
        {exercisesList}
      </StyledText>

      <StyledText className="font-bold text-2xl text-white">
        Muscles Worked:
      </StyledText>
      <StyledText className="text-lg text-white">{musclesWorkedList}</StyledText>

      <StyledView className="h-[0.5px] bg-gray-400 mt-4" />

    </StyledView>
  );
};

const PreviousWorkouts = () => {
  const [workouts, setWorkouts] = useState<WorkoutStructure | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const retrievedWorkout = await getWorkout();
      setWorkouts(retrievedWorkout);
    };

    fetch();
  }, []);

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
