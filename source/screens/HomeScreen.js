import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import Colors from '../constants/Colors';
import {SCREEN_WIDTH} from '../constants/Variables';
import box from '../assets/images/box.png';
import rider from '../assets/images/rider.png';
import rides from '../assets/images/rides.png';
import transaction from '../assets/images/transaction.png';
import Header from '../components/HomeCom/Header';
import {useNavigation} from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

AndroidKeyboardAdjust.setAdjustNothing();

const HomeScreen = () => {
  const navigation = useNavigation();
  let dropDownAlertRef = useRef();
  const inputRef = useRef(null);

  const Notify = (title, message, type) => {
    dropDownAlertRef.alertWithType(type, title, message);
  };
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
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {},
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        inputRef.current.blur();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={{height: '40%'}}>
        <Header r={inputRef} />
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
            onPress={() =>
              Notify(
                'Coming Soon...',
                'This feature is not avaliable yet',
                'warn',
              )
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <MenuOptions
            text="Past Rides"
            img={rides}
            onPress={() => navigation.navigate('Rides')}
          />
          <MenuOptions
            text="Transactions"
            img={transaction}
            onPress={() => navigation.navigate('Transactions')}
          />
        </View>
      </View>
      <DropdownAlert
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
        onClose={() => {
          Platform.OS !== 'ios' && StatusBar.setBackgroundColor(Colors.primary);
        }}
      />
    </View>
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
