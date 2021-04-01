import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home';
import QAScreen from './screens/qa';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" headerMode='none'>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="qa" component={QAScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;