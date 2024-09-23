import React from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';
import Home from './screens/Home';


const StyledView = styled(View);

const App = () => {
  return (
    <StyledView>
      <Home />
    </StyledView>
  );
};

export default App;
