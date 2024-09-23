import { FlatList, Text, View } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

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

const Home = () => {

    const renderWorkoutItem = ({item})  => {
        return (
            <StyledView>
                <StyledText className="text-white">{item.date}</StyledText>
                <StyledText>Muscles Worked : {item.musclesWorked.join(', ')}</StyledText>
                <StyledText>Number of Exercise : {item.exercisesCount}</StyledText>
            </StyledView>
        );
    };

    return (
    <StyledView>
      <StyledText className="text-2xl">Home</StyledText>

      <StyledView>
        <StyledText>Previous Day Workouts</StyledText>
        <FlatList
            data={previousWorkouts}
            renderItem={renderWorkoutItem}
            keyExtractor={(item) => item.id}
        />
      </StyledView>

    </StyledView>
  );
};

export default Home;
