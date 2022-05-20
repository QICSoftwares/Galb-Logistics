import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon, { Icons } from '../components/Icons';
import Colors from '../constants/Colors';
import SVGDown from '../assets/svg/down-left.svg';
import SVGUp from '../assets/svg/top-right.svg'
import { OneFireRead } from '../firebase/Functions';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const Transactions = () => {
  const mm = [
    { "amount": 300, "name": "Ben", "key": '1' },
    { "amount": 600, "name": "Beyyn", "key": '2' }
  ]
  const navigation = useNavigation();
  const uid = useSelector(state => state.user.uid);
  let data
  let user = []
  const map = {
    "data":
    {
      "account_id": 1665521,
      "amount": 300,
      "amount_settled": 300,
      "app_fee": 4.2,
      "auth_model": "PIN",
      "card": { "country": "NIGERIA NG", "expiry": "06/24", "first_6digits": "519911", "issuer": " CREDIT", "last_4digits": "9946", "token": "flw-t1nf-c852e559e74697691d8a468d3771d8db-k3n", "type": "MASTERCARD" },
      "charged_amount": 304.2,
      "created_at": "2022-05-18T18:34:16.000Z",
      "currency": "NGN",
      "customer": {
        "created_at": "2022-05-18T18:34:16.000Z",
        "email": "etuvietu@gmail.com",
        "id": 369231217, "name": "Oghenekaro Eruvieru",
        "phone_number": "N/A"
      },
      "device_fingerprint": "28bbfb9d8a12d1d8cc70d23b0057b6e2",
      "flw_ref": "KicksCitiEnterp/JFGB11351009957937",
      "id": 631003912,
      "ip": "102.89.33.35",
      "merchant_fee": 0,
      "meta": { "__CheckoutInitAddress": "https://checkout.flutterwave.com/v3/hosted/pay" },
      "narration": "CARD Transaction ",
      "payment_type": "card",
      "processor_response": "Approved by Financial Institution",
      "status": "successful",
      "tx_ref": "flw_tx_ref_DUmyEeOm5IYOkgbkfZNY"
    },
    "message": "Transaction fetched successfully",

    "status": "success"
  }
  const [mapp, setMap] = useState(
    {
      "amount": 200, "charged_amount": 202.8, "currency": "NGN",
      "customer": { "created_at": "2022-05-18T21:41:51.000Z", "email": "etuvietu@gmail.com", "id": 369283752, "name": "Oghenekaro Eruvieru", "phone_number": "N/A" }, "flw_ref": "KicksCitiEnterp/TCXT21211010125281", "id": 631098621, "payment_type": "card", "status": "success", "tx_ref": "flw_tx_ref_xMXSjTvd0BRmZcvI28l9", "uid": "3WVVWobFjiXpZz4VzUaaYyiUoNA3"
    },
    {
      "amount": 300, "charged_amount": 304.2, "currency": "NGN",
      "customer": { "created_at": "2022-05-19T14:37:32.000Z", "email": "etuvietu@gmail.com", "id": 369480563, "name": "Oghenekaro Eruvieru", "phone_number": "N/A" }, "flw_ref": "KicksCitiEnterp/GHWT95161010705590", "id": 631444311, "payment_type": "card", "status": "success", "tx_ref": "flw_tx_ref_UE5HmitdLD70tyFiy4xp", "uid": "3WVVWobFjiXpZz4VzUaaYyiUoNA3"
    },
    {
      "amount": 200, "charged_amount": 202.8, "currency": "NGN",
      "customer": { "created_at": "2022-05-19T15:03:54.000Z", "email": "etuvietu@gmail.com", "id": 369488308, "name": "Oghenekaro Eruvieru", "phone_number": "N/A" }, "flw_ref": "KicksCitiEnterp/OGCO56811010726476", "id": 631456064, "payment_type": "card", "status": "success", "tx_ref": "flw_tx_ref_0HaVHn5U8cNmf9tLzag7", "uid": "3WVVWobFjiXpZz4VzUaaYyiUoNA3"
    }
  )
  useEffect(() => {
    const read = async () => {
      // data = await OneFireRead('Transactions', uid)
      // const snap = data.data()
      //console.log(snap)
      //setMap(data.data());
      firestore().collection("Transactions")
        .doc(uid).get().then(sna => {
          sna.forEach((doc) => {
            console.log(doc)
          })
        })
    }
    read()
  }, [])

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
        <Text style={styles.textHeader}>Transactions</Text>
      </View>
    );
  };

  const NotBar = () => {
    return (
      <View style={styles.box}>
        <View style={styles.svgcircle}>
          <SVGUp height={20} width={20} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>Funds Deposited</Text>
          <Text style={styles.textdate}>2022-05-18 18:34:16</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.textamount}>N3000</Text>
          <Text style={{ color: 'green', fontFamily: 'MavenPro-Regular' }}>Credit</Text>
        </View>
      </View>
    )
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>User ID: {item.name}</Text>
        <Text>User Name: {item.amount}</Text>
      </View>

    )
  }
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1 }}>
        <FlatList
          data={mm}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          style={{ flex: 1 }} />
      </View>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  textHeader: {
    fontFamily: 'MavenPro-Bold',
    fontSize: 23,
    color: Colors.black,

    marginLeft: 15,
  },
  text: {
    fontFamily: 'MavenPro-SemiBold',
    fontSize: 17,
    color: Colors.black,
    marginLeft: 15,

  },
  textdate: {
    fontFamily: 'MavenPro-Regular',
    fontSize: 14,
    color: Colors.black,
    marginLeft: 15,

  },
  textamount: {
    fontFamily: 'MavenPro-SemiBold',
    fontSize: 16,
    color: 'blue',

  },
  box: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    padding: 16,
    flexDirection: 'row',
    borderRadius: 10,
    height: 90,
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  svgcircle: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    height: 50,
    width: 50
  }
});
