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
  Platform,
  Modal as RModal,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Colors from '../constants/Colors';
import Icon, {Icons} from '../components/Icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  Header,
  Balance,
  Menu,
  Address,
  generateTransactionRef,
  Bar,
} from '../components/ProfileCom/Components';
import {Logout} from '../firebase/Functions';
import {Modal, Portal, Provider} from 'react-native-paper';
import rider from '../assets/images/rider.png';
import {FlutterwaveInit} from 'flutterwave-react-native';
import {useSelector} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import {FLW_API} from '@env';
import {firebase} from '@react-native-firebase/functions';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

AndroidKeyboardAdjust.setUnchanged();

const ProfileScreen = () => {
  const route = useRoute();
  const {mode, link} = route.params;
  const [btmsh, setBtmsh] = useState('');
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const name = useSelector(state => state.user.name);
  const email = useSelector(state => state.user.email);
  const uid = useSelector(state => state.user.uid);
  const phonenumber = useSelector(state => state.user.phonenumber);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showModal2 = () => setVisible2(true);
  const hideModal2 = () => setVisible2(false);
  const navigation = useNavigation();
  const sheetRef = useRef(null);
  const inputRef = useRef(null);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  let dropDownAlertRef = useRef();
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    zIndex: 100,
    margin: 20,
    borderRadius: 10,
  };
  var items = [
    {
      id: 1,
      name: 'JavaScript',
    },
    {
      id: 2,
      name: 'Java',
    },
    {
      id: 3,
      name: 'Ruby',
    },
    {
      id: 4,
      name: 'React Native',
    },
    {
      id: 5,
      name: 'PHP',
    },
    {
      id: 6,
      name: 'Python',
    },
    {
      id: 7,
      name: 'Go',
    },
    {
      id: 8,
      name: 'Swift',
    },
  ];
  useEffect(() => {
    if (mode === 'Redirect') {
      handleOnRedirect();
    }
  }, [link, mode]);

  const handleOnRedirect = () => {
    var mdatalist = {};
    var data = link.replace('https://galblogistics.app/?', '');
    let datalist = data.split('&');
    datalist.map(m => {
      mdatalist[m.split('=')[0]] = m.split('=')[1];
    });
    if (mdatalist.status == 'cancelled') {
      Notify('Failed', 'The transaction failed', 'error');
    } else if (mdatalist.status == 'successful') {
      confirmTransaction(mdatalist.transaction_id);
    }
  };

  const confirmTransaction = async txid => {
    const {data} = await firebase.functions().httpsCallable('confirmTx')({
      id: txid,
      uid: uid,
    });
    if (data.status === 'success') {
      Notify('Success', 'The transaction was successful', 'success');
    } else {
      Notify('Failed', 'The transaction was not successful', 'error');
    }
  };

  const HeadSheet = props => {
    return (
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
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
          style={{height: 70, width: 70}}
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
            style={{flex: 1, fontFamily: 'MavenPro-Medium'}}
          />
        </View>
        <View style={{width: '50%', height: 40}}>
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
            <View style={{height: '100%'}}>
              <DepositScreen />
            </View>
          ) : (
            <View style={{height: '100%'}}>
              <HeadSheet head={'Withdraw'} />
              <WithdrawScreen />
            </View>
          )}
        </View>
      </View>
    );
  };

  const Deposit = () => {
    setBtmsh('deposit');
    sheetRef.current.snapTo(0);
  };

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

    const onDidInitialize = data => {
      setInit(false);
      setAmount('');
      sheetRef.current.snapTo(1);
      navigation.navigate('Webview', {link: data});
    };
    const onWillInitialize = async () => {
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
              authorization: FLW_API,
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
      <View style={{flex: 1}}>
        <HeadSheet head={'Deposit'} />
        <View
          style={{
            width: '75%',
            flexDirection: 'row',
            alignSelf: 'center',
            marginBottom: 9,
            marginTop: 50,
          }}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: 'MavenPro-Bold',
              fontSize: 15,
            }}>
            Amount
          </Text>
        </View>
        <View
          style={{
            height: 60,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: Colors.black,
            width: '75%',
            alignSelf: 'center',
            marginBottom: 50,
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
            placeholder={'0.00'}
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
    const [amount, setAmount] = useState('');
    const [accnum, setAccnum] = useState('');

    const [init, setInit] = useState(false);

    const handleTransfer = async amount => {
      if (amount.length > 0) {
        if (parseInt(amount) < 200) {
          Notify('Increase Top Up', 'Amount cannot be less than N200', 'warn');
        } else {
          const data = await firebase.functions().httpsCallable('performTf')({
            details: {
              account_bank: '044',
              account_number: '0690000031',
              amount: 200,
              narration: 'Payment for things',
              currency: 'NGN',
              reference: generateTransactionRef(20),
              debit_currency: 'NGN',
            },
          });
        }
      } else {
        Notify(
          'Amount Empty',
          'Please input the amount you want to deposit',
          'error',
        );
      }
    };
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {},
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          input1Ref.current.blur();
          input2Ref.current.blur();
        },
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);

    return (
      <View>
        <View
          style={{
            width: '75%',
            flexDirection: 'row',
            alignSelf: 'center',
            marginBottom: 9,
            marginTop: 25,
          }}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: 'MavenPro-Bold',
              fontSize: 15,
            }}>
            Amount
          </Text>
        </View>
        <View
          style={{
            height: 60,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: Colors.black,
            width: '75%',
            alignSelf: 'center',
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
            ref={input1Ref}
            placeholder={'0.00'}
            defaultValue={amount}
            style={styles.textinput}
            keyboardType={'number-pad'}
            onChangeText={value => setAmount(value)}
          />
        </View>
        <View
          style={{
            width: '75%',
            flexDirection: 'row',
            alignSelf: 'center',
            marginBottom: 9,
            marginTop: 20,
          }}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: 'MavenPro-Bold',
              fontSize: 15,
            }}>
            Account Number
          </Text>
        </View>
        <View
          style={{
            height: 60,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: Colors.black,
            width: '75%',
            alignSelf: 'center',
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            ref={input2Ref}
            placeholder={'0123456789'}
            defaultValue={accnum}
            style={styles.textinput}
            keyboardType={'number-pad'}
            onChangeText={value => setAccnum(value)}
          />
        </View>
        <View
          style={{
            width: '75%',
            flexDirection: 'row',
            alignSelf: 'center',
            marginBottom: 9,
          }}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: 'MavenPro-Bold',
              fontSize: 15,
            }}>
            Bank
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            //sheetRef.current.snapTo(1);
            showModal2();
          }}
          style={{
            height: 60,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: Colors.black,
            width: '75%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 10,
          }}>
          <Text
            style={{
              paddingLeft: 13,
              color: Colors.black,
              fontFamily: 'MavenPro-Regular',
              fontSize: 18,
              flex: 1,
            }}>
            Select Bank
          </Text>
          <Icon
            type={Icons.Feather}
            name={'chevron-down'}
            color={Colors.black}
          />
        </TouchableOpacity>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <TouchableOpacity
            disabled={init}
            style={{
              backgroundColor: Colors.black,
              borderRadius: 360,
              padding: 12,
            }}
            onPress={() => handleTransfer(amount)}>
            {init ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: 'MavenPro-Bold',
                  fontSize: 15,
                }}>
                Withdraw Now
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const SelectBank = () => {
    const [bank, setBank] = useState('');
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {},
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          input3Ref.current.blur();
        },
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);
    return (
      <View style={{padding: 30}}>
        <TouchableOpacity onPress={hideModal2}>
          <Icon type={Icons.Feather} name={'x'} color={'black'} size={32} />
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: 'MavenPro-SemiBold',
            color: Colors.black,
            fontSize: 25,
            marginVertical: 25,
          }}>
          Select Bank
        </Text>
        <View
          style={{
            height: 50,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: Colors.black,
            width: '100%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 8,
          }}>
          <Icon type={Icons.Feather} name={'search'} color={'grey'} />
          <TextInput
            ref={input3Ref}
            placeholder={'Search for Bank'}
            defaultValue={bank}
            style={styles.textinput}
            onChangeText={value => setBank(value)}
          />
        </View>
      </View>
    );
  };
  return (
    <>
      <Provider>
        <Portal>
          <View style={{flex: 1}}>
            <View style={{flex: 1, padding: 16}}>
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
                  onPress={() => navigation.navigate('Transactions')}
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
              enabledInnerScrolling={true}
            />
          </View>
        </Portal>
      </Provider>
      <RModal
        visible={visible2}
        onDismiss={hideModal2}
        //</> contentContainerStyle={containerStyle2}
      >
        <SelectBank />
      </RModal>
      <DropdownAlert
        zIndex={1000}
        updateStatusBar={false}
        defaultContainer={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 12,
          margin: 10,
          borderRadius: 15,
        }}
        messageStyle={{fontFamily: 'MavenPro-Regular', color: 'white'}}
        titleStyle={{fontFamily: 'MavenPro-Bold', color: 'white'}}
        imageStyle={{height: 25, width: 25, alignSelf: 'center'}}
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
    fontSize: 18,
  },
});
