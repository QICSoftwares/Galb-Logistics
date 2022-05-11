import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import logoround from '../../assets/images/logoround.png';
import Icon, {Icons} from '../Icons';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import React from 'react';

export const Balance = () => {
  return (
    <View style={styles.balanceview}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
        }}>
        <Text style={styles.baltext}>Galb Balance</Text>
        <Image
          source={logoround}
          style={{height: 30, width: 30, marginRight: 10}}
        />
      </View>
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text style={styles.amounttext}>N 25,000</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
        }}>
        <Deposit />
        <Withdraw />
      </View>
    </View>
  );
};

export const Menu = props => {
  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',

          width: '100%',
        }}
        onPress={props.onPress}>
        <Icon
          type={props.type}
          name={props.name}
          color={props.color}
          size={props.size}
        />
        <Text style={styles.menutext}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Deposit = () => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.white,
          borderRadius: 10,
          width: '100%',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.textbut}>Deposit</Text>
      </TouchableOpacity>
    </View>
  );
};

const Withdraw = () => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.white,
          width: '100%',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.textbut}>Withdraw</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Header = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
        paddingLeft: 5,
      }}>
      <Icon
        type={Icons.Ionicons}
        name={'person-circle'}
        color={Colors.black}
        size={35}
      />

      <Text style={styles.text}>Benjamin Eruvieru</Text>

      <View style={{alignItems: 'flex-end', flex: 1}}>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon
            type={Icons.Ionicons}
            name={'notifications-outline'}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceview: {
    backgroundColor: Colors.primary,
    margin: 8,
    height: 190,
    borderRadius: 15,
    padding: 8,
    justifyContent: 'space-between',
  },

  baltext: {
    fontFamily: 'MavenPro-SemiBold',
    color: Colors.white,
    marginTop: 5,
  },
  text: {
    fontFamily: 'MavenPro-SemiBold',
    color: Colors.black,
    marginLeft: 5,
  },

  menutext: {
    fontFamily: 'MavenPro-SemiBold',
    color: Colors.black,
    marginLeft: 15,
  },
  amounttext: {
    fontFamily: 'MavenPro-Bold',
    color: Colors.white,
    fontSize: 30,
    marginLeft: 5,
  },

  textbut: {
    fontFamily: 'MavenPro-SemiBold',
    color: Colors.primary,
  },

  buttons: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: '45%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
