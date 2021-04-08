import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, Text, ToastAndroid } from 'react-native';
import QAList from '../constants/qa-list';
import AutoListener from '../components/auto-listener';
import { assistant } from '../services/ibm-watson';
import { BluetoothContext } from '../index';


const QAScreen = ({ navigation }) => {
  const { state: sensorState } = useContext(BluetoothContext);
  const [error, setError] = useState(false);


  const handleOnListenerResult = text => {
    setError(false);

    assistant(text)
      .then(({ data }) => {
        console.log({ data });
        navigation.navigate('message', {
          data: {
            message: data.message
          },
        })
      })
      .catch(error => {
        console.log({ error });
        ToastAndroid.show('حدث خطأ بالسيرفر.', ToastAndroid.SHORT);
        setError(true);
      });
  }

  useEffect(() => {

    if (sensorState === false) {
      navigation.navigate('home');
    }
    
  }, [sensorState]);


  return (<>
    <View style={styles.container}>
      <Text style={styles.title}>يمكنك سؤالي أحد الأسئلة التالية:-</Text>
      <FlatList
        data={QAList}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.text}</Text>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
    <AutoListener onResult={handleOnListenerResult} restartListener={error} />
  </>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 50,
  },
  listItem: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    borderBottomColor: '#ddd',
    borderBottomWidth: 2,
    marginVertical: 10,
    paddingBottom: 7,
  },
  title: {
    alignSelf: 'center',
    fontSize: 22,
    color: '#333',
    marginBottom: 50,
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#999',
  },
});


export default QAScreen;