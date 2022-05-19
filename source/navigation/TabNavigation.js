import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import * as Screen from '../screens';
import Icon, {Icons} from '../components/Icons';
import React from 'react';
import Colors from '../constants/Colors';
import {StatusBarController} from '../constants/Functions';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: Colors.bag1Bg,
      }}
      labeled={false}
      detachInactiveScreens={false}
      activeColor={Colors.primary}
      screenListeners={({route}) => ({
        state: e => {
          {
            StatusBarController(route);
          }
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Screen.HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              type={Icons.MaterialCommunityIcons}
              name="bike-fast"
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Screen.OrderScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              type={Icons.FontAwesome5}
              name="route"
              color={color}
              size={20}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Screen.ProfileScreen}
        initialParams={{
          mode: 'no',
          link: '',
        }}
        options={{
          tabBarIcon: ({color}) => (
            <Icon type={Icons.Entypo} name="wallet" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
