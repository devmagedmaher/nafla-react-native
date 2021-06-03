import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RNBC from 'react-native-bluetooth-classic';
import HomeScreen from '../screens/home';
import QAScreen from '../screens/qa';
import MessageScreen from '../screens/message';
import SensorContext from '../context/sensor';
import storage from '../utils/storage';
import Loading from '../components/loading';
import Tts from 'react-native-tts';
import { Alert, AppState, View } from 'react-native';
import { stopBackgroundListener, startBackgroundListener } from '../headless/bluetooth';
import reactNativeInvokeApp from 'react-native-invoke-app';
import { stopForegroundService } from '../headless/foreground-service';


const Stack = createStackNavigator();

const AppStackScreens = () => {
  const [isBluetoothConnecting, setIsBluetoothConnecting] = useState(true);
  const [isTtsInitializing, setIsTtsInitializing] = useState(true);
  const [bluetoothDevice, setBluetoothDevice] = useState();
  const [sensor, setSensor] = useState(0);
  const [timer, setTimer] = useState(null);
  const [userSessionState, setUserSessionState] = useState(false);


  useEffect(() => {

    // When user is close by
    if (sensor == 1) {
      if (AppState.currentState === 'background') {
        reactNativeInvokeApp();
      }
      setUserSessionState(true);
      // destroy 'close session' timer if exists
      if (timer) {
        console.log('stopping deactivation timer');
        clearTimeout(timer);
        setTimer(null);
      }
    }

    // when user is away
    else if (sensor == 0) {
      if (timer === null) {
        console.log('start deactivation timer');
        const timerId = setTimeout(() => {
          setUserSessionState(false);
          setTimer(null);
        }, 10000);
        setTimer(timerId);
      }
    }

  }, [sensor]);

  const handleDataReceived = ({ data: rawData }) => {
    const data = rawData.replace(/^\s+|\s+$/g, '');
    console.log('data (foreground): ', data, Math.random(), AppState.currentState);
    setSensor(data);
  }

  useEffect(() => console.log({ userSessionState }), [userSessionState]);

  useEffect(() => {
    if (bluetoothDevice) {
      stopForegroundService();

      // bluetooth onDataReceived listener
      console.log('start receiving data from arduino..');
      const subscription = bluetoothDevice.onDataReceived(handleDataReceived);

      return () => {
        console.log('removing app listener..');
        subscription.remove();

        console.log('starting background listener..');
        startBackgroundListener(bluetoothDevice);

        console.log('starting foreground service..');
        startForegroundService();
      }    
    }
  }, [bluetoothDevice]);

  useEffect(() => {

    stopBackgroundListener();
    
    initTts();
    getBluetoothDevice();

  }, [])

  const getBluetoothDevice = async () => {
    storage.get('bluetooth:device')

      .then(async device => {
        const paired = await RNBC.getBondedDevices();
        return paired.find(pairedDevice => pairedDevice.id === device.id);
      })

      .then(async device => {
        const connected = await device.isConnected();
        if (!connected) {
          await device.connect();
        }
        await device.read();
        setBluetoothDevice(device);
      })

    // show errors
      .catch(error => {
        console.log(error);
        Alert.alert('حدث خطأ أثناء الاتصال بجهاز البلوتوث', `\n كود الخطأ: ${error.code}`);
      })

      .finally(() => setIsBluetoothConnecting(false));
  }

  const initTts = async () => {
    Tts.getInitStatus()

    // set default language to arabic
      .then(() => Tts.setDefaultLanguage('ar'))

      .then(() => storage.get('tts:engine'))
      .then(engine => Tts.setDefaultEngine(engine.name))

    // set default voice
      .then(() => storage.get('tts:voice'))
      .then(voice => Tts.setDefaultVoice(voice.id))

    // show errors
      .catch(error => {
        console.log(error);
        Alert.alert('حدث خطأ أثناء إعداد محرك التحدث', `\n كود الخطأ: ${error.code}`);
      })

      .finally(() => setIsTtsInitializing (false));
  }


  return isBluetoothConnecting || isTtsInitializing ? <Loading /> : (
    <SensorContext.Provider value={{}}>
      <View style={{
        height: 3,
        opacity: 0.5,
        backgroundColor: sensor == 1 ? 'blue' : 'red',
      }} />
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="qa" component={QAScreen} />
        <Stack.Screen name="message" component={MessageScreen} />
      </Stack.Navigator>
    </SensorContext.Provider>
  );
}


export default AppStackScreens;