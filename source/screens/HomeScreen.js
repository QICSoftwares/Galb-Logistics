import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../constants/Colors';
import {SCREEN_WIDTH} from '../constants/Variables';
import box from '../assets/images/box.png';
import rider from '../assets/images/rider.png';
import rides from '../assets/images/rides.png';
import transaction from '../assets/images/transaction.png';
import Header from '../components/HomeCom/Header';
import {useNavigation} from '@react-navigation/native';
import {CheckLogin} from '../firebase/Functions';
//import LottieView from 'lottie-react-native';

const HomeScreen = init => {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(init);
  const [user, setUser] = useState();

  const MenuOptions = props => {
    return (
      <View>
        <TouchableOpacity style={styles.menuview} onPress={props.onPress}>
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
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      enabled={false}>
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
            <MenuOptions
              text="Book A Delivery"
              img={box}
              onPress={() => navigation.navigate('Book')}
            />
            <MenuOptions
              text="Hire A Rider"
              img={rider}
              onPress={() => alert('Coming Soon...')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <MenuOptions text="Past Rides" img={rides} />
            <MenuOptions
              text="Transactions"
              img={transaction}
              onPress={() => navigation.navigate('Transactions')}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1},

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
});
