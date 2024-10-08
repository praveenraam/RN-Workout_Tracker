import { Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const GetDateWorkout = () => {

  const route = useRoute();
  const {selectedDate} = route.params;

  return (
    <View>
      <Text>{selectedDate}</Text>
    </View>
  );
};

export default GetDateWorkout;
