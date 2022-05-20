import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { OneFireRead } from '../firebase/Functions';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const db = firestore();


const Rides = () => {

  const yh = async () => {



    const { data } = await firebase.functions().httpsCallable('confirmTx')({
      id: '631456064',
      uid: '3WVVWobFjiXpZz4VzUaaYyiUoNA3'
    });
    console.log(data);
    if (data.status === 'success') {
      console.log('Success');
    } else {
      console.log('Failed');

    }
  }
  //yh()
  return (
    <View>
      <Text>Rides</Text>
    </View>
  );
};

export default Rides;

const styles = StyleSheet.create({});
