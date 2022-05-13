import logoround from '../../assets/images/logoround.png';
import Colors from '../../constants/Colors';
import Icon from '../Icons';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

export const Header = props => {
  return (
    <View
      style={{alignItems: 'center', height: '50%', justifyContent: 'center'}}>
      <Image source={logoround} style={{height: 150, width: 150}} />
      <Text style={styles.textheadmain}>{props.head}</Text>
      <Text style={styles.textheader}>{props.subhead}</Text>
    </View>
  );
};

export const Field = props => {
  const [name, setName] = useState(props.name);
  const [secure, setSecure] = useState(props.secureTextEntry);
  const changePassicon = () => {
    if (name == 'ios-eye') {
      setName('ios-eye-off');
      setSecure(true);
    } else {
      setName('ios-eye');
      setSecure(false);
    }
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={styles.field}>
        <View style={{paddingHorizontal: 5}}>
          <TouchableOpacity
            hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
            disabled={props.disabled}
            onPress={changePassicon}>
            <Icon
              type={props.type}
              name={name}
              color={props.color}
              size={props.size}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder={props.placeholder}
          style={styles.textinput}
          keyboardType={props.keyboardType}
          secureTextEntry={secure}
          onChangeText={value => {
            props.changeText(value);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textheadmain: {
    fontFamily: 'MavenPro-Bold',
    color: Colors.black,
    fontSize: 25,
    marginTop: 20,
    marginBottom: 5,
  },
  textheader: {
    fontFamily: 'MavenPro-Regular',
  },

  field: {
    backgroundColor: Colors.white,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    flex: 1,
    height: 50,
    borderRadius: 180,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  textinput: {
    marginLeft: 5,
    flex: 1,
    fontFamily: 'MavenPro-Regular',
  },
});
