import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home';
import QAScreen from '../screens/qa';
import MessageScreen from '../screens/message';


const Stack = createStackNavigator();

const AppStackScreens = () => {
  
  return (<>
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="qa" component={QAScreen} />
      <Stack.Screen name="message" component={MessageScreen} />
    </Stack.Navigator>
  </>);
}


export default AppStackScreens;