import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DrawerNavigation from './DrawerNavigation';
import * as Screen from '../screens';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      detachInactiveScreens={false}
      screenOptions={{header: () => null}}>
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
      <Stack.Screen name="Book" component={Screen.Book} />
      <Stack.Screen
        name="Notifications"
        component={Screen.NotificationScreen}
      />
      <Stack.Screen name="Transactions" component={Screen.Transactions} />
      <Stack.Screen name="Support" component={Screen.SupportScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
