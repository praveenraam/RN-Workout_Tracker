import { Text, View } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import PreviousWorkouts from '../components/home/PreviousWorkouts';

const StyledView = styled(View);
const StyledText = styled(Text);


const Home = () => {
    return (
    <StyledView className="p-4">
      <StyledText className="text-2xl mb-4">Home</StyledText>


      <PreviousWorkouts />
    </StyledView>
  );
};

export default Home;
