import {Platform, StatusBar} from 'react-native';
import Colors from './Colors';
import {MMKVLoader} from 'react-native-mmkv-storage';
import auth from '@react-native-firebase/auth';

export const StatusBarController = route => {
  if (route.name === 'Order') {
    StatusBar.setBarStyle('dark-content', true);
    Platform.OS !== 'ios' && StatusBar.setBackgroundColor('transparent');
    Platform.OS !== 'ios' && StatusBar.setTranslucent(true);
    return;
  }

  Platform.OS !== 'ios' && StatusBar.setBackgroundColor(Colors.primary);
  StatusBar.setBarStyle('light-content', true);
  Platform.OS !== 'ios' && StatusBar.setTranslucent(false);
};

MMKV = new MMKVLoader().initialize();

export const GetStore = async value => {
  let val = await MMKV.getString(value); // Logs 'string';
  if (!val) {
    console.log('from get fun', val);
    return auth().currentUser.uid;
  }
  return val;
};

export const SetStore = async (key, value) => {
  await MMKV.setStringAsync(key, value);
};
