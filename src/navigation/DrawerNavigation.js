import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useState} from 'react';
import * as Screen from '../screens';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/Colors';
import TabNavigation from './TabNavigation';
import {View, Text, StyleSheet, Image} from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const DrawerHead = () => {
    return (
      <View style={styles.drawerHead}>
        <Text style={styles.textHead1}>Galb Logitics</Text>
      </View>
    );
  };

  const DrawerBody = () => {
    return (
      <View style={styles.drawerBody}>
        <Text></Text>
      </View>
    );
  };

  const DrawerFoot = () => {
    return (
      <View style={styles.drawerFoot}>
        <Text style={styles.textFoot1}>We Are Fast And Reliable</Text>
      </View>
    );
  };

  const renderDrawer = () => {
    return (
      <View style={styles.container}>
        <DrawerHead />
        <DrawerBody />
        <DrawerFoot />
      </View>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
      }}
      drawerContent={renderDrawer}>
      <Drawer.Screen name="Tab" component={TabNavigation} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bag1Bg,
  },

  drawerHead: {
    height: '30%',
    backgroundColor: Colors.primary,
    padding: 16,
    justifyContent: 'flex-end',
  },

  textHead1: {
    color: Colors.bag1Bg,
    fontFamily: 'MavenPro-Bold',
    fontSize: 17,
    marginTop: 20,
  },

  drawerBody: {
    flex: 1,
  },

  drawerFoot: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textFoot1: {
    color: Colors.primary,
    marginRight: 5,
    fontFamily: 'MavenPro-Regular',
  },
});

export default DrawerNavigation;
