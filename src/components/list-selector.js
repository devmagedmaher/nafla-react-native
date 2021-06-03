import React from 'react';
import propTypes from 'prop-types';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet
} from 'react-native';
import Loading from './loading';


const ListSelector = ({
  data,
  isLoading,
  error,
  empty,
  onItemPress,
  currentItem,
  title,
  ...props}) => {



  return (
    <View style={styles.container}>
      {
        error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={data}
            key={({ item }) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Button 
                  title={item.name}
                  onPress={() => onItemPress(item)}
                  color={currentItem.id === item.id ? 'green' : null}
                />
              </View>
            )}
            ListEmptyComponent={<Text>{empty}</Text>}
            refreshing={isLoading}
            ListHeaderComponent={<Text style={styles.title}>{title}</Text>}
            {...props}
          />
        )
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  listItem: {
    marginVertical: 10,
  },
});

ListSelector.propTypes = {
  data: propTypes.array,
  isLoading: propTypes.bool,
  error: propTypes.string,
  empty: propTypes.string,
  onItemPress: propTypes.func,
}

ListSelector.defaultProps = {
  data: [],
  isLoading: true,
  error: 'error',
  empty: 'no data',
  onItemPress: () => 0,
}


export default ListSelector;