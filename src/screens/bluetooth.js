import React, { useEffect, useState, useContext } from 'react';
import { StackActions } from '@react-navigation/routers';
import { View, Text, ActivityIndicator, FlatList, Button, StyleSheet, Alert } from 'react-native';
import RNBC from 'react-native-bluetooth-classic';
import { BluetoothContext } from '../index';


const BluetoothScreen = ({ navigation }) => {
  const { setConnectedDevice } = useContext(BluetoothContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pairedList, setPairedList] = useState([]);


  const getPairedDevices = () => {
    RNBC.getBondedDevices()

      .then(devices => {
        setPairedList(devices);
      })

      .catch(error => {
        console.log({ error });
        setErrorMessage(error.message);
      })

      .finally(() => setIsLoading(false));
  }

  const getConnectedDevices = () => {
    return RNBC.getConnectedDevices()

      // .then(data => console.log({ data }))

      .catch(error => console.log({ error }));
  }
  
  useEffect(() => {
    
    getConnectedDevices()

      .then(([device]) => {
        if (device) {
          afterDeviceConnection(device);
        }
        else {
          getPairedDevices();
        }
      })

  }, []);

  const afterDeviceConnection = device => {
    // start foreground listener
    setConnectedDevice(device);
    // navigation to home screen;
    navigation.dispatch(
      StackActions.replace('home')
    );
  }
  
  const connectToDevice = async device => {
    setIsLoading(true);

    try {
      let connection = await device.isConnected();
      if (!connection) {
        console.log('connecting to ', device.name);
        connection = await device.connect();
      }
      else {
        console.log(device.name, ' device is already connected.');
        Alert.alert(null, 'أنت بالفعل متصل بهذا الجهاز');
      }
      afterDeviceConnection(device)
    } catch (error) {
      console.log({ error });
      Alert.alert('حدث خطأ أثناء الاتصال بالبلوتوث !', error.code || null);
    }
    setIsLoading(false);
  }

  
  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#999' />
    </View>
  ) : errorMessage ? (
    <View style={styles.container}>
      <Text>{errorMessage}</Text>
    </View>
  ) : (
    <View>
      <Text style={styles.title}>الأجهزة المقترنة</Text>
      <Text style={styles.subTitle}>اضغط على اسم الجهاز للإتصال</Text>
      <FlatList
        data={pairedList}
        key={({item}) => item.id}
        renderItem={({ item: device }) => (
          <View style={styles.listItem}>
            <Button 
              title={device.name} 
              onPress={() => connectToDevice(device)} 
            />
          </View>
        )}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginVertical: 50,
  },
  subTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  listItem: {
    marginVertical: 10,
  },
})


export default BluetoothScreen;