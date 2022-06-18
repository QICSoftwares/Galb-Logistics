import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Field, Header} from '../components/AuthCom/Components';
import {Icons} from '../components/Icons';
import Colors from '../constants/Colors';
import {CreateAcc} from '../firebase/Functions';
import {useNavigation} from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';

const SignupScreen = () => {
  const navigation = useNavigation();

  var email = '';
  var name = '';
  var phonenumber = '';
  var password = '';

  let dropDownAlertRef = useRef();
  const [init, setInit] = useState(false);

  const Notify = (title, message, type) => {
    dropDownAlertRef.alertWithType(type, title, message);
  };

  const callBack = error => {
    setInit(false);
    if (error == 'verify') {
      Notify(
        'Please Verify Email Address',
        'Email verification link sent!',
        'warn',
      );
    } else {
      if (error.code === 'auth/email-already-in-use') {
        Notify(
          'Email Already In Use',
          'That email address is already in use!',
          'error',
        );
      }

      if (error.code === 'auth/invalid-email') {
        Notify('Invalid Email', 'That email address is invalid!', 'error');
      }

      if (error.code == 'auth/weak-password') {
        Notify('Weak Password', 'The password is too weak.', 'error');
      }
    }
  };

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
          changeText={value => (name = value)}
        />
        <Field
          placeholder="Phone Number"
          type={Icons.FontAwesome}
          name={'phone'}
          color={Colors.black}
          size={16}
          changeText={value => (phonenumber = value)}
          keyboardType={'number-pad'}
        />
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
        <Field
          placeholder="Password"
          type={Icons.Ionicons}
          name={'ios-eye-off'}
          color={Colors.black}
          size={16}
          secureTextEntry={true}
          changeText={value => (password = value)}
        />
      </View>
    );
  };

  const SignUpPress = () => {
    if (
      email.length > 0 &&
      password.length > 0 &&
      name.length > 0 &&
      phonenumber.length > 0
    ) {
      setInit(true);
      CreateAcc(email, password, name, phonenumber, navigation, callBack);
    } else {
      Notify(
        'Empty Field(s)',
        'Please fill all fields before proceeding',
        'error',
      );
    }
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
          onPress={SignUpPress}>
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
                SignUp
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
        <DropdownAlert
          updateStatusBar={false}
          defaultContainer={{
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 12,
            margin: 10,
            borderRadius: 15,
          }}
          messageStyle={{fontFamily: 'MavenPro-Regular', color: 'white'}}
          titleStyle={{fontFamily: 'MavenPro-Bold', color: 'white'}}
          imageStyle={{height: 25, width: 25, alignSelf: 'center'}}
          ref={ref => {
            if (ref) {
              dropDownAlertRef = ref;
            }
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
