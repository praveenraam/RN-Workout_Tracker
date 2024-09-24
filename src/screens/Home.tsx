import { View } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';

// Components
import PreviousWorkouts from '../components/home/PreviousWorkouts';
import TodaysWorkout from '../components/home/TodaysWorkout';

// Elements Styled
const StyledView = styled(View);

// Interface
export interface Workout {
  id: string;
  date:string;
  musclesWorked: string[];
  exercisesCount:number;
  exercises:string[],
}

const Home = () => {
    return (
    <StyledView className="p-4">
      <PreviousWorkouts />
      <TodaysWorkout />
    </StyledView>
  );
};

export default Home;
