import invokeApp from 'react-native-invoke-app';
import { AppState } from 'react-native';

// bluetooth on data receive subscription variable
let subscription = { remove: () => {
  console.log('There is no subscription currently to remove!');
}};

// bluetooth on data receive event handler
const handleDataReceived = ({ data }) => {
  const filteredData = data.replace(/^\s+|\s+$/g, '');
  console.log('data (bg service): ', filteredData, Math.random(), AppState.currentState);
  if (filteredData == '1' && AppState.currentState === 'background') {
    invokeApp();
  }
}

const startBackgroundListener = device => {

  console.log('start bluetooth data listener on background.');
  subscription = device.onDataReceived(handleDataReceived);

}

const stopBackgroundListener = () => {

  console.log('stop bluetooth data listener on background.');
  subscription.remove();

}


export {
  startBackgroundListener,
  stopBackgroundListener,
}