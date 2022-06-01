import React from 'react';
import {LogBox} from 'react-native';
import Navigation from './source/navigation/Navigation';

LogBox.ignoreLogs(['ViewPropTypes']);

const App = () => {
  return <Navigation />;
};

export default App;
