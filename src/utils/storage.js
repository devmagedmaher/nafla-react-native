import AsyncStorage from '@react-native-community/async-storage';


const parseValue = string => {
  try {
    return JSON.parse(string);
  }
  catch (errro) {
    return string;
  }
}


const set = async (key, value) => {

  try {

    return await AsyncStorage.setItem(`@storage:${key}`, JSON.stringify(value));

  }
  catch (error) {
    
    console.log(error);
    return false;

  }

}


const get = async (key  ) => {

  try {

    const value = await AsyncStorage.getItem(`@storage:${key}`);
    return parseValue(value);

  }
  catch (error) {
    
    console.log(error);
    return false;

  }

}


const update = async (key, value) => {

  try {

    return await AsyncStorage.mergeItem(`@storage:${key}`, JSON.stringify(value));

  }
  catch (error) {

    console.log(error);
    return false;
  }

}


const keyExists = async key => {
  if (Array.isArray(key)) {

  }
  else {

    // const data = await
    
  }
}


export default {
  set,
  get,
  update,
}