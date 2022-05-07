import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

StatusBar.setBackgroundColor(Colors.primary);

const HomeScreen = () => {
  const Header = () => {
    return (
      <View style={styles.headercontainer}>
        <Text>Hi Galb!</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{height: '40%'}}>
        <Header />
      </View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  headercontainer: {
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flex: 1,
  },
});
