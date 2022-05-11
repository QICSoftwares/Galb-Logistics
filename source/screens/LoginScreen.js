import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Field, Header} from '../components/AuthCom/Components';
import {Icons} from '../components/Icons';
import Colors from '../constants/Colors';

const LoginScreen = () => {
  const Body = () => {
    return (
      <View
        style={{
          padding: 16,
          justifyContent: 'space-evenly',
          flex: 2,
          top: -50,
        }}>
        <Field
          placeholder="Email"
          type={Icons.Ionicons}
          name={'person'}
          color={Colors.black}
          size={16}
        />
        <Field
          placeholder="Password"
          type={Icons.Ionicons}
          name={'ios-eye-off'}
          color={Colors.black}
          size={16}
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
        <View style={{margin: 10, height: 20}}>
          <TouchableOpacity style={{height: 20}}>
            <Text
              style={{
                fontFamily: 'MavenPro-Regular',
                color: Colors.primary,
                textDecorationLine: 'underline',
              }}>
              Don't Have An Account SignUp
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
    </View>
  );
};

export default LoginScreen;
