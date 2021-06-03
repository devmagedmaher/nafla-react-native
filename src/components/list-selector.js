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
  listTitle,
  itemTitleKey,
  ...props}) => {



  return (
    <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Button 
                  title={item[itemTitleKey]}
                  onPress={() => onItemPress(item)}
                  color={currentItem === item ? 'green' : null}
                />
              </View>
            )}
            ListFooterComponent={<Text>{error || (data.length === 0 && empty)}</Text>}
            refreshing={isLoading}
            ListHeaderComponent={<Text style={styles.title}>{listTitle}</Text>}
            {...props}
          />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
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
  listTile: propTypes.string,
  itemTitleKey: propTypes.string,
}

ListSelector.defaultProps = {
  data: [],
  isLoading: true,
  error: 'error',
  empty: 'no data',
  onItemPress: () => 0,
  listTitle: null,
  itemTitleKey: 'name',
}


export default ListSelector;