import { FlatList, Text, View } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';

const previousWorkouts = [
  {
    id: '1',
    date: '2024-09-21',
    musclesWorked: ['Biceps', 'Back'],
    exercisesCount: 6,
  },
  {
    id: '2',
    date: '2024-09-20',
    musclesWorked: ['Chest', 'Triceps'],
    exercisesCount: 5,
  },
  {
    id: '3',
    date: '2024-09-19',
    musclesWorked: ['Legs'],
    exercisesCount: 7,
  },
];

const StyledView = styled(View);
const StyledText = styled(Text);

const PreviousWorkouts = () => {

  const renderWorkoutItem = ({item})  => {
    return (
        <StyledView className="mb-4 p-4 border-b border-grey-300">
            <StyledText className="text-xl font-bold">{item.date}</StyledText>
            <StyledText className="text-lg">Muscles Worked : {item.musclesWorked.join(', ')}</StyledText>
            <StyledText className="text-lg">Number of Exercise : {item.exercisesCount}</StyledText>
        </StyledView>
    );
  };

  return (
    <StyledView>
      <StyledView className="mb-4">
        <StyledText className="text-lg font-bold">Previous Day Workouts</StyledText>
      </StyledView>

      <FlatList
        horizontal={true}
        data={previousWorkouts}
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.id}
      />
    </StyledView>
  );
};

export default PreviousWorkouts;
