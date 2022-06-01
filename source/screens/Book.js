import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
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

Geocoder.init(GOOGLE_MAPS_APIKEY);

const Book = () => {
  const navigation = useNavigation();
  const uid = useSelector(state => state.user.uid);

  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [picknum, setPicknum] = useState('');
  const [dropnum, setDropnum] = useState('');
  const [corDrop, setCorDrop] = useState({
    lat: 6.443772399999999,
    lng: 3.25729,
  });
  const [corPick, setCorPick] = useState({
    lat: 6.454633800000001,
    lng: 3.2404206,
  });

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
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type={Icons.MaterialIcons}
            name={'arrow-back'}
            color={Colors.black}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Send Package</Text>
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
      firestore()
        .collection('Delivery')
        .doc(uid)
        .collection('Orders')
        .doc(generateID())
        .set({
          pickupAddress: pickup,
          pickupPhoneNumber: picknum,
          dropoffAddress: dropoff,
          dropoffPhoneNumber: dropnum,
          dropoffGeo: new firestore.GeoPoint(corDrop.lat, corDrop.lng),
          pickupGeo: new firestore.GeoPoint(corPick.lat, corPick.lng),
          uid: uid,
        })
        .then(() => {
          console.log('Order added!');
        })
        .catch(e => {
          alert(e);
        });
    }
  }, [corPick, corDrop]);

  return (
    <View style={{flex: 1}}>
      <Header />
      <TextInput
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
      <Button title={'Next'} onPress={handleBooking} />
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  textHeader: {
    fontFamily: 'MavenPro-Bold',
    fontSize: 23,
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
});
