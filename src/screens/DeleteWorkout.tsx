import { Text, View, Image, ScrollView, FlatList, Pressable  } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styled } from 'nativewind';

const StyledImage = styled(Image);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

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

//     return (
//     <View>
//       <Text>DeleteWorkout</Text>
//     </View>
//   );

    return(
        <StyledScrollView className="h-screen">

            <FlatList

                data={workoutsData}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <>
                        <StyledView>
                            <StyledView>
                                <StyledText key={item.no}>{item.name}</StyledText>
                                <StyledText>Muscle : {item.muscleWorked}</StyledText>
                                <StyledText>Equipment : {item.equipment}</StyledText>
                            </StyledView>
                        </StyledView>
                        <Pressable>
                            <StyledImage source={require('../../assets/right.png')} />
                        </Pressable>
                    </>
                )}
            />

        </StyledScrollView>

    );

};

export default DeleteWorkout;
