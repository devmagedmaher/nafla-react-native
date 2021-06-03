import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreens from './app';
import SetupStackScreens from './setup';
import Loading from '../components/loading';
import settings from '../utils/settings';



const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);

  // check settings data
  useEffect(() => {
    
    settings.get('bluetooth').then(data => console.log({ data }));
    // settings.set('bluetooth', { id: 'testsdfs653sd0s5d6f4s5d6f4s5df64', name: 'hc150' });

  }, []);


  return isLoading ? <Loading /> : (
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