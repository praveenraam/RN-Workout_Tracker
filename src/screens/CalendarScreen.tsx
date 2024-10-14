import { Alert, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Calendar, DateObject } from 'react-native-calendars';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';


const StyledCalender = styled(Calendar)

const CalendarScreen = () => {

  const [selected,setSelected] = useState('');
  const navigation = useNavigation();

  const today = new Date().toISOString().split('T')[0];

  const handleDayPress = (day: DateObject) => {
    console.log('Selected Date : ',day.dateString);
    setSelected(day.dateString);

    if(day.dateString > today){
      Alert.alert(
        'Invalid Date Selection',
        'The selected date exceeds today. Please select a valid date',
        [{text:'OK'}]
      );
    }
    else{
      navigation.navigate('Workout',{ selectedDate:day.dateString });
    }

  };

  return (
    <View className="flex-1 bg-black h-screen">
      <StyledCalender
        onDayPress={handleDayPress}
        theme={{
          backgroundColor: '#000000',         // Background of the calendar
          calendarBackground: '#000000',      // Background of the calendar cells
          textSectionTitleColor: '#ffffff',   // Month & week day title color
          selectedDayBackgroundColor: '#00adf5',  // Background color for selected day
          selectedDayTextColor: '#ffffff',    // Text color for the selected day
          todayTextColor: '#00adf5',          // Text color for today's date
          dayTextColor: '#ffffff',            // Default day text color
          textDisabledColor: '#d9e1e8',       // Color for disabled dates
          dotColor: '#00adf5',                // Dot indicator color
          selectedDotColor: '#ffffff',        // Selected date dot color
          arrowColor: 'white',                // Arrow color for navigating months
          monthTextColor: 'white',
        }}
      />
    </View>
  );
};

export default CalendarScreen;
