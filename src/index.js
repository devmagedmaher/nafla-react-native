import React, { useEffect, createContext, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BluetoothScreen from './screens/bluetooth';
import HomeScreen from './screens/home';
import QAScreen from './screens/qa';
import MessageScreen from './screens/message';
import Tts from 'react-native-tts';
import RNBC from 'react-native-bluetooth-classic';


const Stack = createStackNavigator();

const BluetoothContext = createContext({
  state: false,
  setConnectedDevice: () => {},
});


const App = () => {
  const [deviceId, setDeviceId] = useState(null);
  const [state, _setState] = useState(false);
  const stateRef = useRef(state);
  let timer = null;
  

  const setState = data => {
    _setState(data);
    stateRef.current = data;
  }

  useEffect(() => console.log({state}), [state]);

  const handleDataReceived = ({ data }) => {
    const filteredData = data.replace(/^\s+|\s+$/g, '');
    // console.log('data: ', filteredData);
    // console.log('state: ', stateRef.current);
    // console.log('timer: ', timer);

    
    // if sensor is detecting..
    if (filteredData == '1') {
      if (!stateRef.current) {
        setState(true);
      }
      if (timer) {
        console.log('stopping deactivation timer');
        clearTimeout(timer);
        timer = null;
      }
    }
    // if sensor is not detecting..
    else if (filteredData == '0') {
      if (stateRef.current) {
        if (timer === null) {
          console.log('start deactivation timer');
          timer = setTimeout(() => {
            setState(false);
            timer  = null;
          }, 10000);
        }
      }
    }
  }
  
  useEffect(() => {
    if (deviceId) {
      // bluetooth onDataReceived listener
      let subscription = { remove: () => {} };
      RNBC.getConnectedDevice(deviceId)
        .then(device => {
          console.log('start receiving data from arduino..');
          // bluetooth onDataReceived listener
          subscription = device.onDataReceived(handleDataReceived);
        })
        .catch(error => {
          console.log({ error });
        })

      return () => {
        subscription.remove();
      }
    }
  }, [deviceId])

  useEffect(() => {
    // text-to-speach configuration
    Tts.getInitStatus();
    Tts.setDefaultLanguage('ar');
    Tts.voices()
      .then(voices => voices.filter(e => e.language.startsWith('ar')))
      .then(data => data[0].id)
      .then(voiceId => Tts.setDefaultVoice(voiceId));

  }, [])

  const setConnectedDevice = id => {
    console.log('setConnectedDevice: ', id);
    setDeviceId(id);
  }


  return (
    <BluetoothContext.Provider value={{ state, setConnectedDevice }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="bluetooth" headerMode='none'>
          <Stack.Screen name="bluetooth" component={BluetoothScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="qa" component={QAScreen} />
          <Stack.Screen name="message" component={MessageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BluetoothContext.Provider>
  );
}


export { BluetoothContext };

export default App;