import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DrawerNavigation from './DrawerNavigation';
import * as Screen from '../screens';
import Colors from '../constants/Colors';
import Icon, {Icons} from '../components/Icons';
import {Text, TouchableOpacity, View} from 'react-native';
const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const Head = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <Icon
            type={Icons.MaterialIcons}
            name={'arrow-back'}
            color={Colors.black}
            size={30}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'MavenPro-Bold',
            color: Colors.black,
            fontSize: 20,
            marginLeft: 15,
          }}>
          Support
        </Text>
      </View>
    );
  };
  return (
    <Stack.Navigator initialRouteName="Loading" detachInactiveScreens={false}>
      <Stack.Group screenOptions={{header: () => null}}>
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigation}
          initialParams={{
            uid: 'no',
          }}
        />
        <Stack.Screen name="Book" component={Screen.Book} />
        <Stack.Screen
          name="Notifications"
          component={Screen.NotificationScreen}
        />
        <Stack.Screen name="Transactions" component={Screen.Transactions} />

        <Stack.Screen name="Login" component={Screen.LoginScreen} />
        <Stack.Screen name="Signin" component={Screen.SignupScreen} />
        <Stack.Screen name="Loading" component={Screen.Loading} />
        <Stack.Screen name="Rides" component={Screen.Rides} />
        <Stack.Screen name="Webview" component={Screen.Webview} />

        <Stack.Screen
          name="ForgotPasswordScreen"
          component={Screen.ForgotPasswordScreen}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="Support"
          component={Screen.SupportScreen}
          options={{
            header: props => <Head />,
            headerStyle: {
              backgroundColor: Colors.white,
            },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigation;
