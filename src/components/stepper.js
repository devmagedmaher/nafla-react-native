import React from 'react';
import propTypes from 'prop-types';
import { Button, StyleSheet, Text, View } from 'react-native';


const Stepper = ({ text, onNextPress }) => {

  return (
    <View style={styles.container}>
      <Button title='التالي' onPress={onNextPress} />
      <Text>{text}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingHorizontal: 40,
  },
})


Stepper.propTypes = {
  text: propTypes.string,
  onNextPress: propTypes.func,
}


Stepper.defaultProps = {
  text: null,
  onNextPress: () => 0,
}


export default Stepper;