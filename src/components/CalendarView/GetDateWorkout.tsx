import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getData } from '../../utils/asyncStorageUtils';
import { styled } from 'nativewind';
import { formatDate } from '../home/PreviousWorkouts';
import { FlatList } from 'react-native-gesture-handler';


const muscleData = require('../../workoutData/muscleNames.json');

const GetDateWorkout = () => {

  const route = useRoute();
  const {selectedDate} = route.params;
  const [workoutsList, setWorkoutList] = useState<string[]>([]);
  const [musclesWorked, setMuscleWorked] = useState<string[]>([]);

  const StyledView = styled(View);
  const StyledText = styled(Text);

  useEffect(() => {
    const loadData = async () => {
        const jsonValue  = await getData(selectedDate);

        if (jsonValue) {
          setWorkoutList(jsonValue.workouts);

          const uniqueMuscles = Array.from(
            new Set(
              jsonValue.workouts.map((workout: string) => muscleData[workout] || 'Unknown')
            )
          );
          setMuscleWorked(uniqueMuscles);
        }
        else{
          setWorkoutList([]);
          setMuscleWorked([]);
        }
    };
    loadData();
  },[selectedDate]);

  const renderWorkoutItems = ({ item }: {item:string }) => {
    return (
      <StyledText className="text-white text-lg">&#8227; {item}</StyledText>
    );
  };

  return (
    <StyledView className="flex-1 bg-black p-5">
      <StyledText className="text-2xl font-bold text-white mb-5">
        Workouts done on {formatDate(selectedDate)}
      </StyledText>

      {workoutsList.length > 0 ? (
          <>
            <StyledText className="font-bold text-2xl text-white">
              Muscles Worked:
            </StyledText>
            <StyledText className="text-white text-2xl mb-4">{musclesWorked.join(', ')}</StyledText>
            <FlatList
              data={workoutsList}
              renderItem={renderWorkoutItems}
              keyExtractor={(item,index) => index.toString()}
            />
          </>
        ) : (
          <StyledText className="text-lg text-white">No workouts available</StyledText>
        )
      }

    </StyledView>
  );
};

export default GetDateWorkout;
