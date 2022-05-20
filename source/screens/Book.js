import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {PostFirestore} from '../firebase/Functions';
import auth from '@react-native-firebase/auth';

const Book = () => {
  const navigation = useNavigation();

  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [picknum, setPicknum] = useState('');
  const [dropnum, setDropnum] = useState('');

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

  const callBack = () => {
    console.log('Order added!');
  };
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
      <Button
        title={'Next'}
        onPress={() => {
          PostFirestore(
            'Delivery',
            auth().currentUser.uid,
            {
              pickupAddress: pickup,
              pickupPhoneNumber: picknum,
              dropoffAddress: dropoff,
              dropoffPhoneNumber: dropnum,
            },
            callBack,
          );
        }}
      />
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
