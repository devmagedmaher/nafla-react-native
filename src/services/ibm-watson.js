import axios from 'axios'
import storage from '../utils/storage';

const host = __DEV__ ? 'http://192.168.1.97:3001/api' : 'https://naflarobot.com/api';


const sendMessage = async inputText => {
  const workspace = await storage.get('workspace');
  console.log({ inputText, workspace });
  return axios.post(host + '/mobile/message', { inputText }, {
    headers: {
      'Workspace-Id': workspace.id,
    }
  });
}

const fetchWorkspaces = () => {
  return axios.get(host + '/mobile/workspaces');
}

const getQuestions = async () => {
  const workspace = await storage.get('workspace');
  console.log({ workspace });
  return axios.get(host + '/mobile/dialogs', {
    headers: {
      'Workspace-Id': workspace.id,
    }
  });
}


export { sendMessage, fetchWorkspaces, getQuestions };