import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {PostFirestore} from '../firebase/Functions';
import auth from '@react-native-firebase/auth';
import {GOOGLE_MAPS_APIKEY} from '@env';
import Geocoder from 'react-native-geocoding';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import bluedot from '../assets/images/dotblue.png';
import greendot from '../assets/images/dotgreen.png';
import greydot from '../assets/images/dotgrey.png';
import SVGMap from '../assets/svg/map.svg';
import {Modal, Portal, Provider} from 'react-native-paper';
import DropdownAlert from 'react-native-dropdownalert';

Geocoder.init(GOOGLE_MAPS_APIKEY);

const Book = () => {
  const navigation = useNavigation();
  const uid = useSelector(state => state.user.uid);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState('pickup');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [picknum, setPicknum] = useState('');
  const [dropnum, setDropnum] = useState('');
  const [corDrop, setCorDrop] = useState(null);
  const [corPick, setCorPick] = useState(null);
  const [tapid, setTapid] = useState(1);
  const [tap, setTap] = useState(null);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    zIndex: 100,
    margin: 20,
    borderRadius: 10,
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const generateID = () => {
    let id = '';
    let i = 0;
    while (i <= 10) {
      id += Math.floor(Math.random() * 10);
      i++;
    }
    return 'GBL-' + id;
  };
  const Header = () => {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type={Icons.MaterialIcons}
            name={'arrow-back'}
            color={Colors.black}
            size={25}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Start Package Journey</Text>
      </View>
    );
  };

  const EditText = props => {
    return (
      <View style={styles.viewinput}>
        <GooglePlacesAutocomplete
          ref={ref}
          nearbyPlacesAPI="GooglePlacesSearch"
          placeholder={props.text}
          listViewDisplayed="auto"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyDYb4eMyN3H-ap41sSIEEF8Fpv5H1rEW9k',
            language: 'en',
          }}
          debounce={400}
          autoFillOnNotFound={true}
          onFail={error => console.error(error)}
          styles={{
            textInputContainer: {
              backgroundColor: 'grey',
            },
            textInput: {
              height: 45,
              color: '#5d5d5d',
              fontSize: 16,
              fontFamily: 'MavenPro-Regular',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
      </View>
    );
  };

  const handleBooking = async () => {
    Geocoder.from(pickup, {
      southwest: {lat: 6.341744, lng: 2.673407},
      northeast: {lat: 6.912368, lng: 4.386877},
    })
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log('pickup ', location);
        setCorPick(location);
      })
      .catch(error => console.warn(error));

    Geocoder.from(dropoff, {
      southwest: {lat: 6.341744, lng: 2.673407},
      northeast: {lat: 6.912368, lng: 4.386877},
    })
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log('dropoff ', location);
        setCorDrop(location);
      })
      .catch(error => console.warn(error));
  };

  useEffect(() => {
    if (corDrop !== null && corPick !== null) {
      const orderID = generateID();
      firestore()
        .collection('Delivery')
        .doc(uid)
        .collection('Orders')
        .doc(orderID)
        .set({
          pickupAddress: pickup,
          pickupPhoneNumber: picknum,
          dropoffAddress: dropoff,
          dropoffPhoneNumber: dropnum,
          dropoffGeo: new firestore.GeoPoint(corDrop.lat, corDrop.lng),
          pickupGeo: new firestore.GeoPoint(corPick.lat, corPick.lng),
          uid: uid,
          orderID: orderID,
        })
        .then(() => {
          console.log('Order added!');
        })
        .catch(e => {
          alert(e);
        });
    }
  }, [corPick, corDrop]);
  useEffect(() => {
    if (tapid === 2) {
      setCurrent('dropoff');
    } else if (tapid === 3) {
      setCurrent('number');
    }
  }, [tapid]);
  const Tabs = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              backgroundColor: !props.up
                ? 'transparent'
                : tapid === props.num
                ? 'limegreen'
                : props.color,
              flex: 1,
              width: 2,
            }}></View>
          <Image source={props.img} style={{height: 17, width: 17}} />
          <View
            style={{
              backgroundColor: !props.down
                ? 'transparent'
                : tapid > props.num
                ? props.color
                : 'grey',
              flex: 1,
              width: 2,
            }}></View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: '100%',
            width: '100%',
            alignItems: 'center',
          }}
          onPress={() => {
            setTap(props.id);
            showModal();
          }}
          disabled={!(props.num <= tapid)}>
          <View style={{flex: 1, marginHorizontal: 10}}>
            <Text
              style={{
                fontFamily: 'MavenPro-SemiBold',
                fontSize: 16,
                color: props.color,
                marginBottom: 10,
                marginLeft: 5,
              }}>
              {props.text}
            </Text>
            <Text style={styles.tabBody} numberOfLines={1}>
              {props.subText}
            </Text>
          </View>
          <Icon type={Icons.Feather} name={'chevron-down'} color={'grey'} />
        </TouchableOpacity>
      </View>
    );
  };

  let dropDownAlertRef = useRef();

  const Notify = (title, message, type) => {
    dropDownAlertRef.alertWithType(type, title, message);
  };

  function assignText(value) {
    if (value.length < 1) {
      Notify('Input Text', 'Field cannot be empty!', 'warn');
      return;
    }
    hideModal();
    if (tap === current) {
      setTapid(tapid + 1);
    }
    if (tap === 'pickup') {
      setPickup(value);
    } else if (tap === 'dropoff') {
      setDropoff(value);
    } else if (tap === 'number') {
      setDropnum(value);
    }
  }

  const Input = () => {
    const [text, setText] = useState('');
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <SVGMap height={55} width={55} style={{marginBottom: 40}} />
        <View
          style={{
            height: 50,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: Colors.black,
            width: '100%',
            alignSelf: 'center',
            marginBottom: 35,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 7,
          }}>
          {tap === 'number' ? (
            <Icon
              type={Icons.FontAwesome}
              name={'phone'}
              color={Colors.black}
              size={18}
              style={{marginHorizontal: 5}}
            />
          ) : (
            <Icon
              type={Icons.Entypo}
              name={'location-pin'}
              color={Colors.black}
              size={22}
            />
          )}
          <TextInput
            placeholder={
              tap === 'pickup'
                ? 'Pickup Address'
                : tap === 'dropoff'
                ? 'Dropoff Address'
                : 'Phone Number'
            }
            value={text}
            keyboardType={tap === 'number' ? 'phone-pad' : 'default'}
            onChangeText={value => {
              setText(value);
            }}
            style={{
              fontFamily: 'MavenPro-Regular',
              flex: 1,
            }}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.black,
              borderRadius: 10,
              padding: 12,
            }}
            onPress={() => assignText(text)}>
            <Text
              style={{
                color: Colors.white,
                fontFamily: 'MavenPro-Bold',
                fontSize: 15,
              }}>
              Enter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Provider>
        <Portal>
          <Header />
          <View
            style={{
              flex: 3,
              paddingHorizontal: 25,
            }}>
            <Tabs
              text={'Input Your Pickup Address'}
              subText={tapid > 1 ? pickup : 'Package current location'}
              img={tapid > 1 ? greendot : bluedot}
              up={false}
              down={true}
              id={'pickup'}
              num={1}
              color={tapid > 1 ? 'limegreen' : Colors.primary}
            />
            <Tabs
              text={'Input Your Package Destination'}
              subText={tapid > 2 ? dropoff : 'Package dropoff address'}
              img={tapid > 2 ? greendot : tapid === 2 ? bluedot : greydot}
              up={true}
              down={true}
              id={'dropoff'}
              num={2}
              color={
                tapid > 2 ? 'limegreen' : tapid === 2 ? Colors.primary : 'grey'
              }
            />
            <Tabs
              text={"Input Receiver's Phone Number"}
              subText={tapid > 3 ? dropnum : 'How to contact recipent'}
              img={tapid === 3 ? bluedot : tapid > 3 ? greendot : greydot}
              up={true}
              down={false}
              id={'number'}
              num={3}
              color={
                tapid === 3 ? Colors.primary : tapid > 3 ? 'limegreen' : 'grey'
              }
            />
          </View>
          <View
            style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              disabled={!(tapid > 3)}
              style={{
                width: '75%',
                backgroundColor: tapid > 3 ? Colors.primary : 'grey',
                borderRadius: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{color: Colors.white, fontFamily: 'MavenPro-SemiBold'}}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <Input />
          </Modal>
          <DropdownAlert
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
          {/*<TextInput
        placeholder="Pickup Address"
        value={pickup}
        onChangeText={value => {
          setPickup(value);
        }}
      />
      <TextInput
        placeholder="Dropoff Address"
        value={dropoff}
        onChangeText={value => {
          setDropoff(value);
        }}
      />
      <TextInput
        placeholder="Pickup Number"
        value={picknum}
        onChangeText={value => {
          setPicknum(value);
        }}
      />
      <TextInput
        placeholder="Dropoff Number"
        value={dropnum}
        onChangeText={value => {
          setDropnum(value);
        }}
      />
      <Button title={'Next'} onPress={handleBooking} />*/}
        </Portal>
      </Provider>
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  textHeader: {
    fontFamily: 'MavenPro-SemiBold',
    fontSize: 20,
    color: Colors.black,

    marginLeft: 15,
  },

  textinput: {fontFamily: 'MavenPro-Bold', fontSize: 17, color: Colors.primary},
  edittextinput: {
    fontFamily: 'MavenPro-Bold',
    fontSize: 15,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  viewinput: {margin: 10, paddingHorizontal: 15},

  tabBody: {
    fontFamily: 'MavenPro-Regular',
    fontSize: 13,
    color: 'grey',

    marginLeft: 5,
  },
});
