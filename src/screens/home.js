import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import RNBC from 'react-native-bluetooth-classic';


const HomeScreen = ({ navigation, route }) => {
  const { deviceId } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  
  const handleOnCloseDistance = text => {
    navigation.navigate('message', {
      data: {
        message: 'مَرْحَبَاً !\nيُمْكِنُكَ سُؤَالِي أحَدَ الأسْئِلَة التَالِية..',
      },
      goToOnEnd: 'qa'
    })
  }

  const stopOnDataReceived = subscription => {
    console.log('stop Receiving data from arduino');
    subscription.remove();
  }

  useFocusEffect(
    React.useCallback(() => {

      let subscription = () => 0;
      RNBC.getConnectedDevice(deviceId)
        .then(device => {
          console.log('start receiving data from arduino..');
          subscription = device.onDataReceived(({ data }) => {
            console.log({ data });
            if (data.replace(/^\s+|\s+$/g, '') == '1') {
              console.log('starting conversation..');
              stopOnDataReceived(subscription);
              handleOnCloseDistance();
            }
          })
        })
        .catch(error => {
          console.log({ error });
        })
        .finally(() => {
          setIsLoading(false);
        });
  
      return () => {
        stopOnDataReceived(subscription);
      }  

    }, [])
  );

  useEffect(() => {
  }, [navigation]);

  return (<>
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size='large' color='999' />
      ) : (
        <Text style={styles.text}>إقترب للبدأ..</Text>
      )}
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