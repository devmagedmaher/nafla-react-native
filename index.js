/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/index';
import {name as appName} from './app.json';
import ForegroundService from './src/headless/foreground-service';


ForegroundService.start();

AppRegistry.registerComponent(appName, () => App);
