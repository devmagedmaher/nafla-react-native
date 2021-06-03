import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WorkspaceScreen from '../screens/setup/workspace';
import BluetoothScreen from '../screens/setup/bluetooth';
import TTSEngineScreen from '../screens/setup/tts-engine';
import TTSVoiceScreen from '../screens/setup/tts-voice';


const Stack = createStackNavigator();

const SetupStackScreens = () => {
  
  return (<>
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="workspace" component={WorkspaceScreen} />
      <Stack.Screen name="bluetooth" component={BluetoothScreen} />
      <Stack.Screen name="engines" component={TTSEngineScreen} />
      <Stack.Screen name="voices" component={TTSVoiceScreen} />
    </Stack.Navigator>
  </>);
}


export default SetupStackScreens;