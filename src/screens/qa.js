import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import QAList from '../constants/qa-list';


const QAScreen = () => {
  return (
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
  )
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