import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreens from './app';
import SetupStackScreens from './setup';
import Loading from '../components/loading';
import settings from '../utils/storage';
import FirstTimerContext from '../context/first-timer';



const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [firstTimer, setFirstTimer] = useState(false);
  const firstTimer = useContext(FirstTimerContext);

  // check settings data
  useEffect(() => {
    console.log({ firstTimer });
    
    settings.get('old-user2')
      .then(data => {
        console.log({ data, is: !data })
        if (!data) {
          // setFirstTimer(true);
          firstTimer.set(true);
        }
        setIsLoading(false)
      });

  }, []);


  return isLoading ? <Loading /> : (
    <NavigationContainer>
        {firstTimer.value ? (
          <SetupStackScreens />
        ) : (
          <AppStackScreens />
        )}
    </NavigationContainer>
  );
}


export default MainNavigator;