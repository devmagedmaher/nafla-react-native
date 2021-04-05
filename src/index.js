import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BluetoothScreen from './screens/bluetooth';
import HomeScreen from './screens/home';
import QAScreen from './screens/qa';
import MessageScreen from './screens/message';
import Tts from 'react-native-tts';


const Stack = createStackNavigator();

const App = () => {


  useEffect(() => {
    Tts.getInitStatus();
    Tts.setDefaultLanguage('ar');
    Tts.voices()
      .then(voices => voices.filter(e => e.language.startsWith('ar')))
      .then(data => data[0].id)
      .then(voiceId => Tts.setDefaultVoice(voiceId));

  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="bluetooth" headerMode='none'>
        <Stack.Screen name="bluetooth" component={BluetoothScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="qa" component={QAScreen} />
        <Stack.Screen name="message" component={MessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;