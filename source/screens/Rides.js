import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { OneFireRead } from '../firebase/Functions';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

// set the host and the port property to connect to the emulator
// set these before any read/write operations occur to ensure it doesn't affect your Cloud Firestore data!
if (__DEV__) {
  firestore().useEmulator('localhost', 5000);
}

const db = firestore();

const Rides = () => {

  const yh = async () => {
    const { data } = await firebase.functions().httpsCallable('confirmTx')({
      id: '631098621',
      uid: '3WVVWobFjiXpZz4VzUaaYyiUoNA3'
    });
    console.log(data);
    if (data.status === 'success') {
      console.log('Success');
    } else {
      console.log('Failed');

    }
  }
  yh()
  return (
    <View>
      <Text>Rides</Text>
    </View>
  );
};

export default Rides;

const styles = StyleSheet.create({});
