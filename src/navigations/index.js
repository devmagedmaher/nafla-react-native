import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreens from './app';
import SetupStackScreens from './setup';



const MainNavigator = () => {
  
  return (
    <NavigationContainer>
        {false ? (
          <AppStackScreens />
        ) : (
          <SetupStackScreens />
        )}
    </NavigationContainer>
  );
}


export default MainNavigator;