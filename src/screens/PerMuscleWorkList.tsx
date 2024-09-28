import { Image, Text, View } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { RouteProp, useRoute } from '@react-navigation/native';


//
const StyledImage = styled(Image);
const StyledView = styled(View);
const StyleText = styled(Text);

//
type Param = {
  Muscle:{
    muscleName:string;
  }
}

const PerMuscleWorkedList = () => {

  const route = useRoute<RouteProp<Param,'Muscle'>>();
  const muscleName = route.params.muscleName;

  return (
    <StyledView>
      <StyleText className="text-black">{muscleName}</StyleText>
    </StyledView>
  );
};

export default PerMuscleWorkedList;
