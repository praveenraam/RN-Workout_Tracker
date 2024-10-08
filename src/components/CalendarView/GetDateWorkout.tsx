import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getData } from '../../utils/asyncStorageUtils';

const GetDateWorkout = () => {

  const route = useRoute();
  const {selectedDate} = route.params;
  const [workoutsList,setWorkoutList] = useState('');

  useEffect(() => {
    const loadData = async () => {
        const jsonValue  = await getData(selectedDate);
        setWorkoutList(jsonValue);
        // console.log(workoutsList);
    };
    loadData();
  },[selectedDate]);

  return (
    <View>
      <Text>{selectedDate}</Text>
    </View>
  );
};

export default GetDateWorkout;
