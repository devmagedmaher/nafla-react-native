import React, { useEffect, createContext, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BluetoothScreen from './screens/bluetooth';
import HomeScreen from './screens/home';
import QAScreen from './screens/qa';
import MessageScreen from './screens/message';
import Tts from 'react-native-tts';
import { startBackgroundListener, stopBackgroundListener } from './headless/bluetooth';
import { Alert, AppState, Text } from 'react-native';
import invokeApp from 'react-native-invoke-app';
import {
  startForegroundService,
  stopForegroundService,
} from './headless/foreground-service';
import MainNavigator from './navigations';


const Stack = createStackNavigator();

const BluetoothContext = createContext({
  state: false,
  setConnectedDevice: () => {},
});


const App = () => {
  // const [device, setDevice] = useState(null);
  // const [state, _setState] = useState(false);
  // const stateRef = useRef(state);
  // let timer = null;
  

  // const setState = data => {
  //   _setState(data);
  //   stateRef.current = data;
  // }

  // useEffect(() => console.log({state}), [state]);

  // const handleDataReceived = ({ data }) => {
  //   const filteredData = data.replace(/^\s+|\s+$/g, '');
  //   console.log('data (foreground): ', filteredData, Math.random(), AppState.currentState);
  //   // console.log('state: ', stateRef.current);
  //   // console.log('timer: ', timer);

    
  //   // if sensor is detecting..
  //   if (filteredData == '1') {
  //     if (!stateRef.current) {
  //       if (AppState.currentState === 'background') {
  //         invokeApp();
  //       }
  //       setState(true);
  //     }
  //     if (timer) {
  //       console.log('stopping deactivation timer');
  //       clearTimeout(timer);
  //       timer = null;
  //     }
  //   }
  //   // if sensor is not detecting..
  //   else if (filteredData == '0') {
  //     if (stateRef.current) {
  //       if (timer === null) {
  //         console.log('start deactivation timer');
  //         timer = setTimeout(() => {
  //           setState(false);
  //           timer  = null;
  //         }, 10000);
  //       }
  //     }
  //   }
  // }

  // /**
  //  * on bluetooth device connection
  //  * 
  //  */
  // useEffect(() => {
  //   if (device) {
  //     stopForegroundService();

  //     // bluetooth onDataReceived listener
  //     console.log('start receiving data from arduino..');
  //     const subscription = device.onDataReceived(handleDataReceived);

  //     return () => {
  //       console.log('removing app listener..');
  //       subscription.remove();

  //       console.log('starting background listener..');
  //       startBackgroundListener(device);

  //       console.log('starting foreground service..');
  //       startForegroundService();
  //     }    
  //   }
  // }, [device])

  // /**
  //  * on App launch
  //  * 
  //  */
  // useEffect(() => {
  //   // stop bluetooth data background listner if exists
  //   stopBackgroundListener();

    
  // /**
  //  * text-to-speach setup configuration
  //  */ 
  //   // initialize engine.
  //   Tts.getInitStatus()

  //   // set default language to arabic
  //     .then(() => Tts.setDefaultLanguage('ar'))

  //   // get all available voices
  //     .then(() => Tts.voices())

  //   // get all arabic voices
  //     .then(voices => voices.filter(e => e.language.startsWith('ar')))

  //   // check if there is any available voice
  //     .then(voices => {
  //       if (!voices[0]) {
  //         const error = new Error('No voices found.');
  //         error.code = 'no_voices_found';
  //         throw error;
  //       }
  //       return voices[0].id;
  //     })

  //   // set the first voice as a default voice
  //     .then(voiceId => Tts.setDefaultVoice(voiceId))

  //   // show errors
  //     .catch(error => {
  //       console.log(error);
  //       Alert.alert('حدث خطأ أثناء إعداد محرك الكلام', `\n كود الخطأ: ${error.code}`);
  //     });

  // }, [])

  // const setConnectedDevice = device => {
  //   console.log('setConnectedDevice: ', device.id);
  //   setDevice(device);
  // }


  return <MainNavigator />
}


export { BluetoothContext };

export default App;