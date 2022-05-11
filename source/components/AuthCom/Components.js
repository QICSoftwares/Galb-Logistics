import logoround from '../../assets/images/logoround.png';
import Colors from '../../constants/Colors';
import Icon from '../Icons';
import {TextInput} from 'react-native-gesture-handler';
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

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
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={styles.field}>
        <View style={{paddingHorizontal: 5}}>
          <Icon
            type={props.type}
            name={props.name}
            color={props.color}
            size={props.size}
          />
        </View>
        <TextInput placeholder={props.placeholder} style={styles.textinput} />
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
