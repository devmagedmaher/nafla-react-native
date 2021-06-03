import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, Text, ToastAndroid, ActivityIndicator } from 'react-native';
import AutoListener from '../components/auto-listener';
import { assistant, getQuestions } from '../services/ibm-watson';
import SensorContext from '../context/sensor';
import Loading from '../components/loading';


const QAScreen = ({ navigation }) => {
  const userSessionState = useContext(SensorContext);
  const [error, setError] = useState(false);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);
  const [questions, setQuestinos] = useState([]);


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

    if (userSessionState === false) {
      navigation.navigate('home');
    }
    else {
      getQuestions()
        .then(({ data }) => {
          console.log({ data });
          setQuestinos(data);
        })
        .catch(error => {
          console.log({ error });
          ToastAndroid.show('حدث خطأ بالسيرفر.', ToastAndroid.SHORT);
        });
    }
    
  }, [userSessionState]);


  return isQuestionsLoading ? <Loading /> : (<>
    <View style={styles.container}>
      <Text style={styles.title}>يمكنك سؤالي احد الاسئلة التالية :-</Text>
      <FlatList
        data={questions}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.text}</Text>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
    {/* <AutoListener onResult={handleOnListenerResult} restartListener={error} /> */}
  </>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 10,
  },
  listItem: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    borderBottomColor: '#dadada',
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingBottom: 7,
  },
  title: {
    alignSelf: 'center',
    fontSize: 22,
    color: '#333',
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#aaa',
  },
});


export default QAScreen;