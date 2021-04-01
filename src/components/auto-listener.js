import React, { useState, useEffect } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import Voice from '@react-native-voice/voice';



const AutoListener = ({ onResult, restartListener = false }) => {
  const isFocused = useIsFocused();
  const [volume, setVolume] = useState(0);
  // state 1 => listening
  // state 0 => not listening
  // state -1 => error 
  // state 2 => success 
  const [state, setState] = useState(0);
  const bgColor = {
    '-1': 'red',
    0: 'grey',
    1: 'blue',
    2: 'green',
  };


  useEffect(() => {
    console.log({ restartListener });
    if (restartListener) {
      startListen();
    }
  }, [restartListener])

  const onSuccess = data => {
    const text = data[0];

    onResult(text);
  }

  const startListen = () => {
    setTimeout(() => Voice.start('ar-EG'), 500);
  }

  useEffect(() => {

    if (isFocused) {

      // Start listening..
      startListen();
      
      // ON SPEECH **START**
      Voice.onSpeechStart = e => {
        console.log('started listening: ', e);
        setState(1);
      };
      // ON SPEECH **ENDS**
      Voice.onSpeechEnd = e => {
        console.log('ended listening: ', e);
        setState(0);
      };
      // ON SPEECH **SUCCESS**
      Voice.onSpeechResults = e => {
        console.log('listening results: ', e);
        onSuccess(e.value);
      };
      // ON SPEECH **ERROR**
      Voice.onSpeechError = e => {
        console.log('error listening: ', e);

        // handle errors
        switch(e.error.code) {
          // network connectino error
          case '2':
            ToastAndroid.show('تعذر الإتصال بالانترنت', ToastAndroid.SHORT);
          break;
          // no recognized words error
          case '7':
            ToastAndroid.show('تعذر التعرف الصوتي', ToastAndroid.SHORT);
          break;
        }
        // no network connection error code
        if (e.error.code == 2) { 
        }

        setState(-1);
        startListen();
      };

      // ON SPEECH **VOLUME CHANGE**
      Voice.onSpeechVolumeChanged = e => {
        setVolume(e.value > 0 ? e.value : 0);
      };

      // REMOVE LISTENERS
      return () => {
        Voice.removeAllListeners();
        Voice.destroy();
      }

    }

  }, [isFocused]);

  return (<>
    <View style={{ ...styles.container, backgroundColor: bgColor[state] }}>
      <View style={{ ...styles.voiceLevel, flex: volume / 10 }} />
    </View>
  </>)
}


const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  voiceLevel: {
    backgroundColor: 'pink',
    opacity: 0.4,
  }
});


export default AutoListener;