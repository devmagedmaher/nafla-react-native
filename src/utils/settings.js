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

    return await AsyncStorage.setItem(`settings:${key}`, JSON.stringify(value));

  }
  catch (error) {
    
    console.log(error);
    return false;

  }

}


const get = async (key, value) => {

  try {

    const value = await AsyncStorage.getItem(`settings:${key}`);
    return parseValue(value);

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
}