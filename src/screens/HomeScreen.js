import {TextInput, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Icon, {Icons} from '../components/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SCREEN_WIDTH} from '../constants/Variables';
import box from '../assets/images/box.png';
import rider from '../assets/images/rider.png';
import rides from '../assets/images/rides.png';
import transaction from '../assets/images/transaction.png';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const Header = () => {
    return (
      <View style={styles.headercontainer}>
        <View style={styles.drawerIconView}>
          <TouchableOpacity style={{}} onPress={() => navigation.openDrawer()}>
            <Icon type={Icons.Feather} name={'menu'} color={Colors.white} />
          </TouchableOpacity>
          <Icon
            type={Icons.Ionicons}
            name={'notifications-outline'}
            color={Colors.white}
          />
        </View>
        <HeaderText />
        <View style={{flex: 1, justifyContent: 'center', paddingBottom: 0}}>
          <TrackOrder />
        </View>
      </View>
    );
  };

  const HeaderText = () => {
    return (
      <View style={{flex: 2, justifyContent: 'center'}}>
        <Text style={styles.headertext}>Hi Galb!</Text>
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

  const MenuOptions = props => {
    return (
      <View>
        <TouchableOpacity style={styles.menuview}>
          <Image
            source={props.img}
            style={styles.menuimg}
            resizeMode={'contain'}
          />
          <Text style={styles.menutext}>{props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{height: '40%'}}>
        <Header />
      </View>
      <View style={{justifyContent: 'space-evenly', flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <MenuOptions text="Book A Delivery" img={box} />
          <MenuOptions text="Hire A Rider" img={rider} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <MenuOptions text="Past Rides" img={rides} />
          <MenuOptions text="Transactions" img={transaction} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1},

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

  menutext: {
    fontFamily: 'MavenPro-SemiBold',
    color: Colors.black,
    marginTop: 5,
  },

  menuview: {
    height: SCREEN_WIDTH / 2 - 22,
    width: SCREEN_WIDTH / 2 - 22,
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuimg: {height: '50%', width: '50%'},
  drawerIconView: {flexDirection: 'row', justifyContent: 'space-between'},
});
