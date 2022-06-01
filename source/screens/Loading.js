import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {CheckLogin, SendEmailVerification} from '../firebase/Functions';
const Loading = () => {
  const navigation = useNavigation();

  const resultLogin = (user, subscriber) => {
    console.log(user);
    if (user == null) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Signin'}],
      });
      navigation.navigate('Signin');
      return subscriber;
    }
    if (user.emailVerified == false) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      navigation.navigate('Login');
      return subscriber;
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'Drawer'}],
    });
    navigation.navigate('Drawer');
    return subscriber;
  };
  CheckLogin(resultLogin);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default Loading;
