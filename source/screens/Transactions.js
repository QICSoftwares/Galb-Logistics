import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/Colors';

const Transactions = () => {
  const navigation = useNavigation();

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

  return (
    <View>
      <Header />
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
});
