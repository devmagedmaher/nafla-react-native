import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BluetoothScreen from '../screens/setup/bluetooth';


const Stack = createStackNavigator();

const SetupStackScreens = () => {
  
  return (<>
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="bluetooth" component={BluetoothScreen} />
    </Stack.Navigator>
  </>);
}


export default SetupStackScreens;