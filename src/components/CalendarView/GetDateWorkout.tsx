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

        if(jsonValue){
          setWorkoutList(jsonValue.workouts.join(', '));
        }
        else{
          setWorkoutList('No workouts available');
        }
    };
    loadData();
  },[selectedDate]);

  return (
    <View>
      <Text>{workoutsList}</Text>
    </View>
  );
};

export default GetDateWorkout;
