import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Stepper from '../../components/stepper';
import Loading from '../../components/loading';


const BluetoothScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  /**
   * Get bluetooth paried devices
   * 
   */
  const getPairedDevices = async () => {
    setTimeout(() => {
      // setError('Something went wrong.');
      setIsLoading(false);
    }, Math.random()*2000+1000);
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
  const tryAgain = () => {
    console.log('try again')
    setError(null);
    setIsLoading(true);
    getPairedDevices();
  }

  const connectToDevice = () => {
    navigation.navigate('engines');
  }


  return (<>
    <View style={styles.container}>
      {isLoading ? (
        <Loading text='Loaidng paired devices' />
      ) : error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
          <Button title='Try again' onPress={tryAgain} />
        </View>
      ) : (
        <Text>bluetooth list</Text>
      )}
    </View>
    <Stepper onNextPress={connectToDevice} />
  </>);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    marginBottom: 20,
    color: 'red',
  },
});


export default BluetoothScreen;