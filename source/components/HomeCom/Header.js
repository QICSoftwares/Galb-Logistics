import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon, {Icons} from '../Icons';
import Colors from '../../constants/Colors';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {useSelector} from 'react-redux';

MMKV = new MMKVLoader().initialize();

const Header = () => {
  const navigation = useNavigation();
  const name = useSelector(state => state.user.name);

  const [user, setUser] = useState();
  useEffect(() => {
    setUser(name.split(' ')[0]); // Logs 'string';
  }, [name]);
  const HeaderText = () => {
    return (
      <View style={{flex: 2, justifyContent: 'center'}}>
        <Text style={styles.headertext}>Hi {user}!</Text>
      </View>
    );
  };

  const TrackOrder = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white,
            borderRadius: 5,
            height: 45,
            marginRight: 16,
            paddingLeft: 10,
          }}>
          <TextInput
            placeholder="Enter Order Number"
            style={{flex: 1, fontFamily: 'MavenPro-Medium'}}
          />
        </View>
        <View style={{width: '30%', height: 40}}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.black,
              padding: 8,
              borderRadius: 5,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.white, fontFamily: 'MavenPro-Medium'}}>
              Track Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.headercontainer}>
      <View style={styles.drawerIconView}>
        <TouchableOpacity style={{}} onPress={() => navigation.openDrawer()}>
          <Icon type={Icons.Feather} name={'menu'} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon
            type={Icons.Ionicons}
            name={'notifications-outline'}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
      <HeaderText />
      <View style={{flex: 1, justifyContent: 'center', paddingBottom: 0}}>
        <TrackOrder />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headercontainer: {
    backgroundColor: Colors.primary,

    padding: 16,
    flex: 1,
  },

  headertext: {
    color: Colors.white,
    fontFamily: 'MavenPro-Bold',
    fontSize: 35,
  },

  drawerIconView: {flexDirection: 'row', justifyContent: 'space-between'},
});
