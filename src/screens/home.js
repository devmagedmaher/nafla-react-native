import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>تحدث للبدأ..</Text>
    </View>
  )  
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