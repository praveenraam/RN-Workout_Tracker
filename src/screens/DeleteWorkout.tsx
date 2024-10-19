import { Text, View, Image, ScrollView, FlatList, Pressable  } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styled } from 'nativewind';

const StyledImage = styled(Image);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledFlatList = styled(FlatList);

const DeleteWorkout = () => {

    const [workoutsData,setWorkoutsData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const muscleGroups = ['Back','Biceps','Legs','Shoulders','Triceps','Chest'];
            let allWorkouts: any[] = [];

            for (const muscle of muscleGroups) {
                try {
                    const data = await AsyncStorage.getItem(muscle);
                    if (data) {
                        const parseData = JSON.parse(data);
                        allWorkouts = [...allWorkouts, ...parseData];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            setWorkoutsData(allWorkouts);
            console.log(workoutsData);
        };
        fetchData();
    },[]);

    return(
        <StyledScrollView className="h-screen bg-black">
            <StyledFlatList className="mt-4"

                data={workoutsData}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <StyledView className="flex flex-row items-center justify-between mb-2 mx-4">
                        <StyledView className="flex-1">
                            <StyledText key={item.no} className="text-2xl font-bold text-white">{item.name}</StyledText>
                            <StyledText className="text-sm text-white mb-1">Muscle : {item.muscleWorked}</StyledText>
                            <StyledText className="text-sm text-white mb-3">Equipment : {item.equipment}</StyledText>
                        </StyledView>
                        <Pressable>
                            <StyledImage className="w-8 h-8 right-3" source={require('../../assets/x-mark.png')} />
                        </Pressable>
                    </StyledView>
                )}
            />
        </StyledScrollView>
    );

};

export default DeleteWorkout;
