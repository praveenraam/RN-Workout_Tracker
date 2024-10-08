import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { styled } from 'nativewind';

const StyledCalender = styled(Calendar)

const CalendarScreen = () => {

  const [selected,setSelected] = useState('');

  const handleDayPress = (day: DateObject) => {
    console.log('Selected Date : ',day.dateString);
    setSelected(day.dateString);
  };

  return (
    <View>
      <StyledCalender

        onDayPress={handleDayPress}
        // theme={

        // }

      />
    </View>
  );
};

export default CalendarScreen;
