import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Field, Header} from '../components/AuthCom/Components';
import DropdownAlert from 'react-native-dropdownalert';
import {Icons} from '../components/Icons';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {PasswordReset} from '../firebase/Functions';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  var email = '';
  const [init, setInit] = useState(false);

  let dropDownAlertRef = useRef();

  const Notify = (title, message, type) => {
    dropDownAlertRef.alertWithType(type, title, message);
  };

  const callBack = e => {
    setInit(false);
    if (e == 'email') {
      Notify(
        'Password Reset Email Sent',
        'Please check your email for instructions on how to reset your password',
        'success',
      );
    } else {
      Notify(
        e.code.replace('[]', '').trim(),
        e.message.replace(e.code, '').replace('[]', '').trim(),
        'error',
      );
    }
  };
  const Password = () => {
    if (email.length > 0) {
      setInit(true);
      PasswordReset(email.trim(), callBack);
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
      <View style={{padding: 16, flex: 1}}>
        <Field
          placeholder="Email"
          type={Icons.MaterialCommunityIcons}
          name={'email'}
          color={Colors.black}
          size={16}
          value={email}
          changeText={value => (email = value)}
          keyboardType={'email-address'}
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
          }}
          disabled={init}
          onPress={Password}>
          <View
            style={{
              backgroundColor: Colors.primary,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              borderRadius: 180,
            }}>
            {init ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={{fontFamily: 'MavenPro-Bold', color: Colors.white}}>
                Send Password Reset Email
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={{margin: 10, height: 20}}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontFamily: 'MavenPro-Regular',
                color: Colors.primary,
                textDecorationLine: 'underline',
              }}>
              Remembered Password? Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header head={'Password Reset'} subhead={'Enter your email address'} />
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

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
