import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Colors from '../constants/Colors';
import { Icons } from '../components/Icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  Header,
  Balance,
  Menu,
  Address,
  generateTransactionRef,
} from '../components/ProfileCom/Components';
import { Logout } from '../firebase/Functions';
import { Modal, Portal, Provider } from 'react-native-paper';
import rider from '../assets/images/rider.png';
import { FlutterwaveInit } from 'flutterwave-react-native';
import { useSelector } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { FLW_API } from '@env';
import { firebase } from '@react-native-firebase/functions';

const ProfileScreen = () => {
  console.log(FLW_API);
  const route = useRoute();
  const { mode, link } = route.params;

  const name = useSelector(state => state.user.name);
  const email = useSelector(state => state.user.email);
  const uid = useSelector(state => state.user.uid);

  const phonenumber = useSelector(state => state.user.phonenumber);

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const navigation = useNavigation();

  const [btmsh, setBtmsh] = useState('');

  const sheetRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (mode === 'Redirect') {
      handleOnRedirect();
    }
  }, [link, mode]);

  const handleOnRedirect = () => {
    var mdatalist = {};
    var data = link.replace('https://galblogistics.app/?', '');
    console.log(data);
    let datalist = data.split('&');
    datalist.map(m => {
      mdatalist[m.split('=')[0]] = m.split('=')[1];
    });
    console.log(mdatalist);
    if (mdatalist.status == 'cancelled') {
      Notify('Failed', 'The transaction failed', 'error');
    } else if (mdatalist.status == 'successful') {
      confirmTransaction(mdatalist.transaction_id);
    }
  };

  const confirmTransaction = async txid => {
    Notify('Confirming Transaction', 'This may take few minutes don\'t close the app', 'warn');
    const { data } = await firebase.functions().httpsCallable('confirmTx')({
      id: txid,
      uid: uid
    });
    console.log(data);
    if (data.status === 'success') {
      Notify('Success', 'The transaction was successful', 'success');
    } else {
      Notify('Failed', 'The transaction was not successful', 'error');

    }
  };



  const Bar = () => {
    return (
      <View
        style={{
          paddingVertical: 16,
          width: '100%',
        }}>
        <View
          style={{
            backgroundColor: Colors.primary,
            width: 50,
            height: 5,
            borderRadius: 360,
            alignSelf: 'center',
          }}></View>
      </View>
    );
  };

  const HeadSheet = props => {
    return (
      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <Text style={styles.texthead}>{props.head}</Text>
      </View>
    );
  };

  const TrackOrder = () => {
    return (
      <View
        style={{
          justifyContent: 'space-around',
          height: 250,
          alignItems: 'center',
        }}>
        <Image
          source={rider}
          resizeMode={'contain'}
          style={{ height: 70, width: 70 }}
        />
        <View
          style={{
            backgroundColor: Colors.blue,
            borderRadius: 5,
            height: 50,
            marginBottom: 16,
            paddingLeft: 10,
            width: '100%',
          }}>
          <TextInput
            placeholder="Enter Order Number"
            style={{ flex: 1, fontFamily: 'MavenPro-Medium' }}
          />
        </View>
        <View style={{ width: '50%', height: 40 }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.black,
              padding: 8,
              borderRadius: 5,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: Colors.white, fontFamily: 'MavenPro-Medium' }}>
              Track Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const BottomSheetV = () => {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => sheetRef.current.snapTo(1)}
          style={{
            position: 'absolute',
            top: 0,
            bottom: -20,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}></TouchableOpacity>
        <View
          style={{
            backgroundColor: Colors.white,
            height: btmsh == 'address' ? '45%' : '79%',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
          }}>
          <Bar />
          {btmsh == 'address' ? (
            <View>
              <HeadSheet head={'Address Book'} />
              <Address />
            </View>
          ) : btmsh == 'deposit' ? (
            <View style={{ height: '100%' }}>
              <DepositScreen />
            </View>
          ) : (
            <View style={{ height: '100%' }}>
              <HeadSheet head={'Withdraw'} />
              <WithdrawScreen />
            </View>
          )}
        </View>
      </View>
    );
  };

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    zIndex: 100,
    margin: 20,
    borderRadius: 10,
  };

  const Deposit = () => {
    setBtmsh('deposit');
    sheetRef.current.snapTo(0);
  };
  let dropDownAlertRef = useRef();

  const Notify = (title, message, type) => {
    dropDownAlertRef.alertWithType(type, title, message);
  };
  const DepositScreen = () => {
    const [amount, setAmount] = useState('');

    const [init, setInit] = useState(false);

    const onInitializeError = data => {
      Notify('Error', data, 'error');
      setInit(false);
    };
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => { },
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

    const onDidInitialize = data => {
      console.log('initialized');
      setInit(false);
      setAmount('');
      sheetRef.current.snapTo(1);
      navigation.navigate('Webview', { link: data });
    };
    const onWillInitialize = async () => {
      console.log('initialing');
      setInit(true);
      Keyboard.dismiss();
    };

    const handlePayment = async amount => {
      if (amount.length > 0) {
        if (parseInt(amount) < 200) {
          Notify('Increase Top Up', 'Amount cannot be less than N200', 'warn');
        } else {
          onWillInitialize();
          try {
            // initialize payment
            const paymentLink = await FlutterwaveInit({
              tx_ref: generateTransactionRef(20),
              authorization: '***REMOVED***',
              amount: amount,
              currency: 'NGN',
              customer: {
                email: email,
                phonenumber: phonenumber,
                name: name,
              },
              payment_options: 'card, account, banktransfer, ussd, qr',
              redirect_url: 'https://galblogistics.app',
            });
            // use payment link
            onDidInitialize(paymentLink);
            console.log(paymentLink);
          } catch (error) {
            // handle payment error
            onInitializeError(error.message);
          }
        }
      } else {
        Notify(
          'Amount Empty',
          'Please input the amount you want to deposit',
          'error',
        );
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <HeadSheet head={'Deposit'} />

        <View
          style={{
            height: 60,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: Colors.black,
            width: '75%',
            alignSelf: 'center',
            marginVertical: 50,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingLeft: 13,
              color: Colors.black,
              fontFamily: 'MavenPro-Bold',
              fontSize: 20,
            }}>
            ₦
          </Text>
          <TextInput
            ref={inputRef}
            placeholder={'Input Amount'}
            defaultValue={amount}
            style={styles.textinput}
            keyboardType={'number-pad'}
            onChangeText={value => setAmount(value)}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            disabled={init}
            style={{
              backgroundColor: Colors.black,
              borderRadius: 360,
              padding: 12,
            }}
            onPress={() => handlePayment(amount)}>
            {init ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: 'MavenPro-Bold',
                  fontSize: 15,
                }}>
                Pay Now
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Withdraw = () => {
    setBtmsh('withdraw');
    sheetRef.current.snapTo(0);
  };

  const WithdrawScreen = () => {
    return (
      <View>
        <Text>Yh</Text>
      </View>
    );
  };

  return (
    <>
      <Provider>
        <Portal>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
              <Header />
              <Balance deposit={Deposit} withdraw={Withdraw} />
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
                    showModal();
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

                <View style={{ paddingLeft: 6 }}>
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
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}>
              <TrackOrder />
            </Modal>
            <BottomSheet
              ref={sheetRef}
              snapPoints={['100%', 0]}
              borderRadius={0}
              renderContent={BottomSheetV}
              initialSnap={1}
            />
          </View>
        </Portal>
      </Provider>
      <DropdownAlert
        zIndex={10000}
        onClose={() => {
          Platform.OS !== 'ios' && StatusBar.setBackgroundColor(Colors.primary);
        }}
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  texthead: {
    fontFamily: 'MavenPro-SemiBold',
    color: Colors.black,
    fontSize: 19,
  },
  textinput: {
    marginLeft: 5,
    flex: 1,
    fontFamily: 'MavenPro-Regular',
    fontSize: 19,
  },
});
