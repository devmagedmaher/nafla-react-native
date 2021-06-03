import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { BluetoothContext } from '../index';
import storage from '../utils/storage';


const HomeScreen = ({ navigation }) => {
  const { state: sensorState } = useContext(BluetoothContext);


  const startConversation = text => {
    navigation.navigate('message', {
      data: {
        message: 'مَرْحَبَاً !\nيُمْكِنُكَ سُؤَالِي أحَدَ الأسْئِلَة التَالِية..',
      },
      goToOnEnd: 'qa'
    });
  }

  useEffect(() => {

    if (sensorState === true) {
      startConversation();
    }
    
  }, [sensorState]);


  return (<>
    <Button title='clear' onPress={() => storage.clear()} />
    <View style={styles.container}>
      <Text style={styles.text}>إقترب للبدأ..</Text>
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