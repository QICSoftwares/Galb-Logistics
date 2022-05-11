import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useState} from 'react';
import * as Screen from '../screens';
import Colors from '../constants/Colors';
import TabNavigation from './TabNavigation';
import {View, Text, StyleSheet, Image} from 'react-native';
import logoround from '../assets/images/logoround.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon, {Icons} from '../components/Icons';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const DrawerHead = () => {
    return (
      <View style={styles.drawerHead}>
        <Image
          source={logoround}
          style={{height: 70, width: 70}}
          resizeMode={'contain'}
        />
        <Text style={styles.textHead1}>Galb Logitics</Text>
      </View>
    );
  };

  const DrawerBody = props => {
    return (
      <View style={styles.drawerBody}>
        <View>
          <TouchableOpacity
            style={{
              ...styles.viewBody,
              backgroundColor: Colors.blue,
            }}
            onPress={() => {
              console.log(props.navigation);
              props.navigation.closeDrawer();
              props.navigation.jumpTo('Home');
            }}>
            <Icon type={Icons.Octicons} name={'home'} color={Colors.black} />
            <Text style={styles.textBody}>Home</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{
              ...styles.viewBody,
              backgroundColor: 'transparent',
            }}
            onPress={props.navigation.closeDrawer}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              name={'bike-fast'}
              color={Colors.black}
            />

            <Text style={styles.textBody}>Rides History</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              ...styles.viewBody,
              backgroundColor: 'transparent',
            }}
            onPress={props.navigation.closeDrawer}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              name={'bank-transfer'}
              color={Colors.black}
              size={27}
            />
            <Text style={styles.textBody}>Transactions History</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              ...styles.viewBody,
              backgroundColor: 'transparent',
            }}
            onPress={props.navigation.closeDrawer}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              name={'face-agent'}
              color={Colors.black}
            />
            <Text style={styles.textBody}>Help & Support</Text>
          </TouchableOpacity>
        </View>
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

  const RenderDrawer = props => {
    return (
      <View style={styles.container}>
        <DrawerHead />
        <DrawerBody {...props} />
        <DrawerFoot />
      </View>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Tab"
      detachInactiveScreens={false}
      screenOptions={{
        header: () => null,
        drawerPosition: 'left',
      }}
      drawerContent={props => <RenderDrawer {...props} />}>
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

  textBody: {
    color: Colors.black,
    fontFamily: 'MavenPro-SemiBold',
    fontSize: 15,
    marginLeft: 10,
  },

  drawerBody: {
    flex: 1,
    paddingTop: 5,
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

  viewBody: {
    marginVertical: 5,
    marginRight: 10,
    height: 50,
    alignItems: 'center',
    paddingLeft: 25,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
  },
});

export default DrawerNavigation;
