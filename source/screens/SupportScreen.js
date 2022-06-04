import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/Colors';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
AndroidKeyboardAdjust.setAdjustResize();

const SupportScreen = () => {
  const input1Ref = useRef(null);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {},
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        input1Ref.current.blur();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const Head = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: 14,
          alignItems: 'center',
          elevation: 5,
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 10,
          backgroundColor: Colors.white,
        }}>
        <Icon
          type={Icons.MaterialIcons}
          name={'arrow-back'}
          color={Colors.black}
          size={30}
        />
        <Text
          style={{
            fontFamily: 'MavenPro-Bold',
            color: Colors.black,
            fontSize: 20,
            marginLeft: 15,
          }}>
          Support
        </Text>
      </TouchableOpacity>
    );
  };
  const Body = () => {
    return <View style={{flex: 1}}> </View>;
  };

  const Foot = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.white,
          alignItems: 'center',
          padding: 12,
        }}>
        <TouchableOpacity>
          <Icon
            type={Icons.MaterialIcons}
            name={'attach-file'}
            color={Colors.primary}
            size={26}
          />
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: 11,
            backgroundColor: Colors.blue,
            flex: 1,
            paddingHorizontal: 20,
            borderRadius: 360,
          }}>
          <TextInput
            ref={input1Ref}
            style={styles.textinput}
            multiline={true}
            placeholder="Send Message"
          />
        </View>
        <TouchableOpacity>
          <Icon
            type={Icons.Ionicons}
            name={'send'}
            color={Colors.primary}
            size={26}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Head />
      <Body />
      <Foot />
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  textinput: {
    fontFamily: 'MavenPro-SemiBold',
    maxHeight: 60,
  },
});
