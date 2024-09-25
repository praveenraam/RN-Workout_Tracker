import { FlatList, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';

// Interface
import { Workout } from '../../screens/Home';

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
        <StyledText className="text-lg font-bold text-black">{formatDate(item.date)}</StyledText>
        <StyledText className="font-bold text-xl">Muscle Worked : {item.musclesWorked.join(', ')}</StyledText>
        <StyledText className="font-bold">Number of Exercises : {item.exercisesCount}</StyledText>
    </StyledView>
  );
};

const PreviousWorkouts = () => {

  return (
    <StyledScrollView>
      <StyledView >
        <StyledText className="text-lg font-bold text-black">Previous Day Workouts</StyledText>
      </StyledView>

      <FlatList
        data={previousWorkouts}
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.id}
      />
    </StyledScrollView>
  );
};

export default PreviousWorkouts;
