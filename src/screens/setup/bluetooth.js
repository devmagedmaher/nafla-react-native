import React, { useEffect, useState } from 'react';
import RNBC from 'react-native-bluetooth-classic';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Stepper from '../../components/stepper';
import Loading from '../../components/loading';
import ListSelector from '../../components/list-selector';
import storage from '../../utils/storage';


const BluetoothScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pairedDevices, setPairedDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState({});
  const [isConnecting, setIsConnecting] = useState(false);


  /**
   * Get bluetooth paried devices
   * 
   */
  const getPairedDevices = async () => {
    RNBC.getBondedDevices()

      .then(devices => {
        setPairedDevices(devices);
      })

      .catch(error => {
        console.log({ error });
        setErrorMessage(error.message);
      })

      .finally(() => setIsLoading(false));
  }

  /**
   * ON Screen Mount
   * 
   */
  useEffect(() => { getPairedDevices() }, [])

  /**
   * Try `getPairedDevices` again.
   * 
   */
  const refresh = () => {
    console.log('try again')
    setError(null);
    setIsLoading(true);
    getPairedDevices();
  }

  const selectDevice = device => {
    setSelectedDevice(device);
    console.log(device);
  }

  const connectToDevice = async () => {
    if (isConnecting) return false;
    setIsConnecting(true);

    try {
      await selectedDevice.connect();
      await storage.set('bluetooth-device', {
        id: selectedDevice.id,
        name: selectedDevice.name,
      });
      navigation.navigate('engines');
    } catch (error) {
      console.log({ error });
      Alert.alert('حدث خطأ أثناء الاتصال بالبلوتوث !', error.code || null);
    }

    setIsConnecting(false);
  }


  return (<>
    <ListSelector
      title='اختر جهاز البلوتوث'
      data={pairedDevices}
      isLoading={isLoading}
      error={error}
      onItemPress={selectDevice}
      currentItem={selectedDevice}
      onRefresh={refresh}
    />
    {isConnecting && <Loading size='small' />}
    <Stepper
      onNextPress={connectToDevice}
      NextDisabled={!selectedDevice.id} 
    />
  </>)
}


export default BluetoothScreen;