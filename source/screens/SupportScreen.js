import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SupportScreen = () => {
  const Head = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center',
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
      </View>
    );
  };
  const Body = () => {
    return (
      <View style={{flex: 1}}>
        <Text>SupportScreen</Text>
      </View>
    );
  };

  const Foot = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.white,
          alignItems: 'center',
          paddingRight: 15,
          paddingVertical: 15,
        }}>
        <TextInput style={styles.textinput} placeholder="Send Message" />
        <TouchableOpacity>
          <Icon
            type={Icons.Ionicons}
            name={'send'}
            color={Colors.primary}
            size={30}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Head />

      <KeyboardAvoidingView
        keyboardShouldPersistTaps={'always'}
        behavior="padding"
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Body />
        </View>
        <Foot />
      </KeyboardAvoidingView>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  textinput: {
    fontFamily: 'MavenPro-SemiBold',
    marginHorizontal: 15,
    backgroundColor: Colors.blue,
    flex: 1,
    paddingHorizontal: 20,
    borderRadius: 360,
  },
});
