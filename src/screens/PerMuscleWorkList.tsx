import { Image, Text, View } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { RouteProp, useRoute } from '@react-navigation/native';


//
const StyledImage = styled(Image);
const StyledView = styled(View);
const StyledText = styled(Text);

//
type Param = {
  Muscle:{
    muscleName:string;
  }
}


const PerMuscleWorkedList = () => {

  const getImage = (Muscle:string) => {
    if(Muscle === 'Back'){
      return require('../../assets/WorkoutList/Back.webp');
    }
    else if(Muscle === 'Biceps'){
      return require('../../assets/WorkoutList/Biceps.webp');
    }
    else if(Muscle === 'Chest'){
      return require('../../assets/WorkoutList/Chest.webp');
    }
    else if(Muscle === 'Legs'){
      return require('../../assets/WorkoutList/Glutes.webp');
    }
    else if(Muscle === 'Shoulders'){
      return require('../../assets/WorkoutList/Shoulders.webp');
    }
    else if(Muscle === 'Triceps'){
      return require('../../assets/WorkoutList/Triceps.webp');
    }
  };

  const route = useRoute<RouteProp<Param,'Muscle'>>();
  const muscleName = route.params.muscleName;

  return (
    <StyledView>
      <StyledText className="text-black">{muscleName}</StyledText>
      <StyledImage source={getImage(muscleName)} />
    </StyledView>
  );
};

export default PerMuscleWorkedList;
