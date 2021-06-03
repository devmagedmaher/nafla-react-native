import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ToastAndroid } from 'react-native';
import { BluetoothContext } from '../index';
import { assistant } from '../services/ibm-watson';


const HomeScreen = ({ navigation }) => {
  const { state: sensorState } = useContext(BluetoothContext);
  const [isLoading, setIsLoading] = useState(false);


  const startConversation = text => {
    navigation.navigate('message', {
      data: {
        message: text,
      },
      goToOnEnd: 'qa'
    });
  }

  const requestConversation = () => {
    setIsLoading(true);

    assistant()
      .then(({ data }) => {
        console.log({ data });
        startConversation(data.message);
      })
      .catch(error => {
        console.log({ error });
        ToastAndroid.show('حدث خطأ بالسيرفر.', ToastAndroid.SHORT);
        setIsLoading(false)
      });
  }

  useEffect(() => {

    if (sensorState === true) {
      requestConversation();
    }
    
  }, [sensorState]);


  return (<>
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size='small' color='#999' />
      ) : (<>
        <Text style={styles.text}>إقترب للبدأ..</Text>
      </>)}
    </View>
  </>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#555'
  },
});


export default HomeScreen;