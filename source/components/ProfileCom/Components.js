import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import logoround from '../../assets/images/logoround.png';
import Icon, {Icons} from '../Icons';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import React, {useState, useEffect} from 'react';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {useSelector} from 'react-redux';

MMKV = new MMKVLoader().initialize();

export const Balance = props => {
  const balance = useSelector(state => state.user.balance);

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
        <Text style={styles.amounttext}>
          ₦ {balance.toString().includes('.') ? balance : `${balance}.00`}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
        }}>
        <Deposit deposit={props.deposit} />
        <Withdraw withdraw={props.withdraw} />
      </View>
    </View>
  );
};

export const Address = props => {
  const address = useSelector(state => state.user.address);

  return (
    <View style={styles.addressview}>
      {address.length < 1 ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Icon
            type={Icons.Entypo}
            name={'address'}
            color={Colors.black}
            size={40}
          />

          <Text style={styles.addresstext}>Your Address Book Is Empty</Text>
        </View>
      ) : (
        <View>
          <Text>it usnt</Text>
        </View>
      )}
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

const Deposit = props => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        onPress={() => props.deposit()}
        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
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

const Withdraw = props => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        onPress={() => props.withdraw()}
        hitSlop={{top: 20, bottom: 20, left: 80, right: 80}}
        style={{
          backgroundColor: Colors.white,
          width: '100%',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={styles.textbut}>Withdraw</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Header = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.name);

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

      <Text style={styles.text}>{user}</Text>

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

export const generateTransactionRef = length => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `flw_tx_ref_${result}`;
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
  addressview: {
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
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

  addresstext: {
    marginTop: 20,
    fontFamily: 'MavenPro-SemiBold',
    color: Colors.black,
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
