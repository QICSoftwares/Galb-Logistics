import {Text, View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import React from 'react';
import {Field, Header} from '../components/AuthCom/Components';
import {Icons} from '../components/Icons';
import Colors from '../constants/Colors';

const SignupScreen = () => {
  const Body = () => {
    return (
      <View
        style={{
          padding: 16,
          justifyContent: 'space-around',
          flex: 9,
          top: -50,
        }}>
        <Field
          placeholder="Full Name"
          type={Icons.Ionicons}
          name={'person'}
          color={Colors.black}
          size={16}
        />
        <Field
          placeholder="Phone Number"
          type={Icons.FontAwesome}
          name={'phone'}
          color={Colors.black}
          size={16}
        />
        <Field
          placeholder="Email"
          type={Icons.MaterialCommunityIcons}
          name={'email'}
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
          top: -25,
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
              SignUp
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{margin: 10, height: 20}}>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: 'MavenPro-Regular',
                color: Colors.primary,
                textDecorationLine: 'underline',
              }}>
              Alreadly Have An Account Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      enabled={false}>
      <View style={{flex: 1}}>
        <Header head={'Welcome'} subhead={'Create your account'} />
        <Body />
        <Footer />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
