import {Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Field, Header} from '../components/AuthCom/Components';
import {Icons} from '../components/Icons';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {Login} from '../firebase/Functions';
import {SendEmailVerification} from '../firebase/Functions';
import DropdownAlert from 'react-native-dropdownalert';
import {BackHandler} from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation();

  var email = '';
  var password = '';

  const [disabled, setDisabled] = useState(null);

  let dropDownAlertRef = useRef();

  const Notify = (title, message, type) => {
    dropDownAlertRef.alertWithType(type, title, message);
  };

  const Timer = () => {
    setDisabled(true);
    const timeout = setTimeout(() => {
      setDisabled(false);
    }, 60000);
  };

  const callBack = error => {
    if (error == 'verify') {
      Timer();
      Notify(
        'Please Verify Email Address',
        'Email verification link sent!',
        'warn',
      );
    } else {
      if (error.code === 'auth/wrong-password') {
        Notify(
          'Wrong Password',
          error.message.replace(error.code, '').replace('[]', '').trim(),
          'error',
        );
      }

      if (error.code === 'auth/user-not-found') {
        Notify(
          'User Not Found',
          error.message.replace([error.code], '').replace('[]', '').trim(),
          'error',
        );
      }

      if (error.code == 'auth/invalid-email') {
        Notify(
          'Invalid Email',
          error.message.replace([error.code], '').replace('[]', '').trim(),
          'error',
        );
      }
    }
  };

  const LoginPress = () => {
    if (email.length > 0 && password.length > 0) {
      Login(email, password, navigation, callBack);
    } else {
      Notify(
        'Empty Field(s)',
        'Please fill all fields before proceeding',
        'error',
      );
    }
  };

  const Body = () => {
    return (
      <View
        style={{
          padding: 16,
          justifyContent: 'space-evenly',
          flex: 2,
          top: -70,
        }}>
        <Field
          placeholder="Email"
          type={Icons.Ionicons}
          name={'person'}
          color={Colors.black}
          size={16}
          disabled={true}
          changeText={value => (email = value)}
          keyboardType={'email-address'}
        />

        <Field
          placeholder="Password"
          type={Icons.Ionicons}
          name={'ios-eye-off'}
          color={Colors.black}
          size={16}
          secureTextEntry={true}
          disabled={false}
          changeText={value => (password = value)}
        />
      </View>
    );
  };

  const Footer = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={LoginPress}
          style={{
            backgroundColor: Colors.primary,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            borderRadius: 180,
          }}>
          <View
            style={{
              backgroundColor: Colors.primary,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              borderRadius: 180,
            }}>
            <Text style={{fontFamily: 'MavenPro-Bold', color: Colors.white}}>
              Login
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{margin: 10, height: 150, alignItems: 'center'}}>
          {disabled == null ? (
            <View
              style={{
                height: 40,
              }}></View>
          ) : (
            <TouchableOpacity
              disabled={disabled}
              style={{
                height: 40,
                paddingTop: 5,
              }}
              onPress={() => {
                SendEmailVerification();
                Timer();
              }}>
              <View
                style={{
                  height: 40,
                  borderRadius: 180,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: 'MavenPro-Regular',
                    color: disabled == true ? 'grey' : Colors.primary,
                    textDecorationLine: 'underline',
                  }}>
                  Resend Verification Link
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{height: 20}}
            onPress={() => navigation.navigate('Signin')}>
            <Text
              style={{
                fontFamily: 'MavenPro-Regular',
                color: Colors.primary,
                textDecorationLine: 'underline',
              }}>
              Don't Have An Account SignUp
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{height: 20, margin: 10}}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text
              style={{
                fontFamily: 'MavenPro-Regular',
                color: Colors.primary,
                textDecorationLine: 'underline',
              }}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header head={'Welcome Back'} subhead={'Log into your account'} />
      <Body />
      <Footer />
      <DropdownAlert
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
    </View>
  );
};

export default LoginScreen;
