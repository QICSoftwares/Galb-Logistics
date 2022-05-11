import {Platform, StatusBar} from 'react-native';
import Colors from './Colors';

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
