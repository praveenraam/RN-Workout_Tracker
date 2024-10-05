import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveData = async (workout:any): Promise<void> => {

    try{
        const date = new Date().toISOString().split('T')[0];
        console.log(workout);
        const jsonValue = JSON.stringify(workout);

        console.log('ToStore : ',jsonValue);
        await AsyncStorage.setItem(date,jsonValue);
    }catch{
        console.log('Error i saving data');
    }

};

export const getData = async (date:any): Promise<any | null> => {
    try{
        const data = await AsyncStorage.getItem(date);
        if(data != null){
            return JSON.parse(data);
        }
        else{
            return null;
        }
    }
    catch(error){
        console.log('Error is get cleared', error);
        return null;
    }
};

export const removeData = async (date:any): Promise<any | null> => {
    try{
        await AsyncStorage.removeItem(date);
    }
    catch(error){
        console.log('Error in removing data');
    }
};


export const clearData = async(): Promise<void> =>{
    try{
        await AsyncStorage.clear();
        console.log('No error');
    }
    catch(error){
        console.log('Error : ',error);
    }
};
