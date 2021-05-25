import axios from 'axios'

const host = __DEV__ ? 'http://192.168.1.97:3001/api' : 'https://nfla1-rest-api.herokuapp.com/api';


const assistant = inputText => {
  console.log({ inputText });
  return axios.post(host + '/ibm-watson/assistant', { inputText });
}

const getQuestions = () => {
  return axios.get(host + '/ibm-watson/dialog');
}


export { assistant, getQuestions };