import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DrawerNavigation from './DrawerNavigation';
import * as Screen from '../screens';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      detachInactiveScreens={false}
      screenOptions={{ header: () => null }}>
      <Stack.Screen name="Drawer" component={DrawerNavigation} initialParams={{
        uid: 'no',
      }} />
      <Stack.Screen name="Book" component={Screen.Book} />
      <Stack.Screen
        name="Notifications"
        component={Screen.NotificationScreen}
      />
      <Stack.Screen name="Transactions" component={Screen.Transactions} />
      <Stack.Screen name="Support" component={Screen.SupportScreen} />
      <Stack.Screen name="Login" component={Screen.LoginScreen} />
      <Stack.Screen name="Signin" component={Screen.SignupScreen} />
      <Stack.Screen name="Loading" component={Screen.Loading} />
      <Stack.Screen name="Rides" component={Screen.Rides} />
      <Stack.Screen name="Webview" component={Screen.Webview} />

      <Stack.Screen
        name="ForgotPasswordScreen"
        component={Screen.ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
