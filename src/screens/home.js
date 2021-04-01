import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AutoListener from '../components/auto-listener';


const HomeScreen = () => {

  
  const handleListenerResult = text => {
    console.log({ text });
  }


  return (<>
    <View style={styles.container}>
      <Text style={styles.text}>تحدث للبدأ..</Text>
    </View>
    <AutoListener onResult={handleListenerResult} />
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