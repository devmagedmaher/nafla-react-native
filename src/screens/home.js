import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AutoListener from '../components/auto-listener';
import Tts from 'react-native-tts';


const HomeScreen = ({ navigation }) => {

  
  const handleListenerResult = text => {
    navigation.navigate('message', {
      data: {
        message: 'مَرْحَبَاً !\nيُمْكِنُكَ سُؤَالِي أحَدَ الأسْئِلَة التَالِية..',
      },
      // goToOnEnd: 'qa'
    })
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