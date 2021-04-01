import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackActions } from '@react-navigation/native';
import Tts from 'react-native-tts';


const MessageScreen = ({ route, navigation }) => {
  const { data, goToOnEnd } = route.params;
  const [responseArray, setResponseArray] = useState(false);
  const [message, setMessage] = useState(null);


  const endMessage = (error) => {
    console.log('message end');
    console.log({ error });
    if (navigation.isFocused()) {
      if (goToOnEnd) {
        navigation.dispatch(
          StackActions.replace(goToOnEnd)
        );      
      }
      else {
        navigation.goBack();
      }
    }
  }

  const startSpeech = (n = 0) => {
    if (responseArray === false) return;
    if (!navigation.isFocused()) return;
    if (responseArray[n]) {
      const textMessage = responseArray[n];

      const onTTSFinish = event => {
        console.log('finish: ', event);
        Tts.removeEventListener('tts-finish', onTTSFinish);
        startSpeech(n+1);
      }

      setMessage(textMessage);
      Tts.speak(textMessage);
      Tts.addEventListener('tts-finish', onTTSFinish);

    }
    else {
      endMessage();
    }
  }
  
  useEffect(startSpeech, [responseArray]);

  useEffect(() => {
    console.log({ data });
    const resArr = data.message.split('\n');
    setResponseArray(resArr.length > 0 ? resArr : false);
  }, [data]);

  useEffect(() => {
    return () => {
      Tts.stop(true);
    }
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  textContainer: {
    flex: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    color: '#555',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});


export default MessageScreen;