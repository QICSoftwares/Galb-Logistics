import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import Colors from './src/constants/Colors';
import Navigation from './src/navigation/Navigation';

StatusBar.setBackgroundColor(Colors.primary);
LogBox.ignoreLogs(['ViewPropTypes']);

const App = () => {
  return <Navigation />;
};

export default App;
