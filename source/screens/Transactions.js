import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/Colors';
import SVGDown from '../assets/svg/down-left.svg';
import SVGUp from '../assets/svg/top-right.svg';
import SVGEmpty from '../assets/svg/girl-using-mobile-net-banking.svg';
import {OneFireRead} from '../firebase/Functions';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {SCREEN_WIDTH} from '../constants/Variables';
const Transactions = () => {
  const navigation = useNavigation();
  const uid = useSelector(state => state.user.uid);

  const [map, setMap] = useState();
  useEffect(() => {
    const read = async () => {
      firestore()
        .collection('Transactions')
        .doc(uid)
        .get()
        .then(m => {
          if (!m.exists) {
            setMap(false);
            return;
          }
          setMap(m.data().orders.reverse());
        });
    };
    read();
  }, []);

  const Header = () => {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
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

  const NotBar = props => {
    return (
      <View style={styles.box}>
        <View style={styles.svgcircle}>
          <SVGUp height={20} width={20} />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.text}>Funds Deposited</Text>
          <Text style={styles.textdate}>
            {props.props.customer.created_at
              .replace('T', ' ')
              .replace('.000Z', '')}
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.textamount}>₦{props.props.amount}</Text>
          <Text style={{color: 'green', fontFamily: 'MavenPro-Regular'}}>
            Credit
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return <NotBar props={item} />;
  };

  const renderEmpty = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {map == false ? (
          <>
            <SVGEmpty height={SCREEN_WIDTH} width={SCREEN_WIDTH} />
            <Text style={styles.text}>No Transactions Yet</Text>
          </>
        ) : (
          <ActivityIndicator size={'large'} color={Colors.primary} />
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={{flex: 1}}>
        <FlatList
          data={map}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          style={{flex: 1}}
          contentContainerStyle={{flex: 1}}
        />
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
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    marginBottom: 15,
  },
  svgcircle: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    height: 50,
    width: 50,
  },
});
