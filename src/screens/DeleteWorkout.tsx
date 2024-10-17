import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteWorkout = () => {

    useEffect(() => {
        const fetchData = async () => {
            const muscleGroups = ['Back','Biceps','Legs','Shoulders','Triceps','Chest'];
            let workoutsData: any[] = [];

            for(const muscle of muscleGroups){
                try{
                    const data = await AsyncStorage.getItem(muscle);
                    if(data){
                        const parseData = JSON.parse(data);
                        workoutsData = [...workoutsData, ...parseData];
                    }
                }
                catch(error){
                    console.log(error);
                }
            }
            console.log(workoutsData);
        };
        fetchData();
    });

    return (
    <View>
      <Text>DeleteWorkout</Text>
    </View>
  );
};

export default DeleteWorkout;
