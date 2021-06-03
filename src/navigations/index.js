import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreens from './app';
import SetupStackScreens from './setup';
import Loading from '../components/loading';
import settings from '../utils/storage';



const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [firstTime, setFirstTime] = useState(false);

  // check settings data
  useEffect(() => {
    
    settings.get('bluetooth')
      .then(data => {
        if (!data) {
          setFirstTime(true);
        }
        setIsLoading(false)
      });

  }, []);


  return isLoading ? <Loading /> : (
    <NavigationContainer>
        {firstTime ? (
          <AppStackScreens />
        ) : (
          <SetupStackScreens />
        )}
    </NavigationContainer>
  );
}


export default MainNavigator;