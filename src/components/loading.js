import React from 'react';
import propTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';


const Loading = ({ text, color, size, ...props}) => {

  return (
    <View style={styles.container}>
      <ActivityIndicator
        {...props}
        color={color}
        size={size}
      />
      {text ? <Text>{text}</Text> : null}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {

  },
})


Loading.propTypes = {
  text: propTypes.string,
  color: propTypes.string,
  size: propTypes.oneOf(['large', 'small']),
}


Loading.defaultProps = {
  text: null,
  color: '#999',
  size: 'large',
}


export default Loading;