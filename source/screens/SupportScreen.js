import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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
          padding: 15,
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
          <TextInput style={styles.textinput} placeholder="Send Message" />
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
    <KeyboardAvoidingView
      behavior={Platform.select({android: undefined, ios: 'padding'})}
      style={{flex: 1}}>
      <View style={{flex: 1, paddingBottom: 50}}>
        <View style={{flex: 1}}>
          <Body />
        </View>
        <Foot />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  textinput: {
    fontFamily: 'MavenPro-SemiBold',
  },
});
