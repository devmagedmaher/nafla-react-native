import axios from 'axios'

const host = __DEV__ ? 'http://192.168.1.97:3001/api' : 'https://nfla1-rest-api.herokuapp.com/api';


const sendMessage = inputText => {
  console.log({ inputText });
  return axios.post(host + '/mobile/message', { inputText });
}

const fetchWorkspaces = () => {
  return axios.get(host + '/mobile/workspaces');
}

const getQuestions = () => {
  return axios.get(host + '/ibm-watson/dialog');
}


export { sendMessage, fetchWorkspaces, getQuestions };