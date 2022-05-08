import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();
AppRegistry.registerComponent(appName, () => App);
