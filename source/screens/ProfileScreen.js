import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import Colors from '../constants/Colors';
import Icon, {Icons} from '../components/Icons';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import {Header, Balance, Menu} from '../components/ProfileCom/Components';
import {Logout} from '../firebase/Functions';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [btmsh, setBtmsh] = useState('');

  const sheetRef = useRef(null);

  const BottomSheetV = () => {
    return (
      <View style={{backgroundColor: Colors.white, height: '100%'}}>
        {btmsh == 'address' ? (
          <View>
            <Text>Address Book</Text>
          </View>
        ) : (
          <View>
            <Text>Track Package</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <Header />
        <Balance />
        <View
          style={{
            paddingHorizontal: 16,
            justifyContent: 'space-around',
            flex: 1,
          }}>
          <Menu
            text={'Address Book'}
            type={Icons.Entypo}
            name={'location'}
            color={Colors.black}
            onPress={() => {
              setBtmsh('address');
              sheetRef.current.snapTo(0);
            }}
          />
          <Menu
            text={'Track Package'}
            type={Icons.Feather}
            name={'package'}
            color={Colors.black}
            onPress={() => {
              setBtmsh('track');
              sheetRef.current.snapTo(0);
            }}
          />
          <Menu
            text={'Transactions History'}
            type={Icons.MaterialCommunityIcons}
            name={'bank-transfer'}
            color={Colors.black}
            size={28}
            onPress={() => navigation.navigate('Signin')}
          />
          <Menu
            text={'Help & Support'}
            type={Icons.MaterialCommunityIcons}
            name={'face-agent'}
            color={Colors.black}
            size={28}
            onPress={() => navigation.navigate('Support')}
          />

          <View style={{paddingLeft: 6}}>
            <Menu
              text={'Log Out'}
              type={Icons.AntDesign}
              name={'logout'}
              color={Colors.black}
              size={22}
              onPress={() => Logout(navigation)}
            />
          </View>
        </View>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={['46%', 0]}
        borderRadius={20}
        renderContent={BottomSheetV}
        initialSnap={1}
      />
    </View>
  );
};

export default ProfileScreen;

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
