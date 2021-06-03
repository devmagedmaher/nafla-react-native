import React, { useEffect, useState } from 'react';
import storage from '../../utils/storage';
import { Button, StyleSheet, Text, View } from 'react-native';
import Stepper from '../../components/stepper';
import Loading from '../../components/loading';


const TTSVoiceScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  /**
   * Get bluetooth paried devices
   * 
   */
  const getPairedDevices = async () => {

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

  }

  const selectVoice = () => {
    storage.set('old-user', true);
  }


  return (<>
    <View style={styles.container}>
      {isLoading ? (
        <Loading text='Loaidng text-to-speach engines' />
      ) : error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
          <Button title='Try again' onPress={tryAgain} />
        </View>
      ) : (
        <Text>Engines list</Text>
      )}
    </View>
    <Stepper onNextPress={selectVoice} />
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


export default TTSVoiceScreen;