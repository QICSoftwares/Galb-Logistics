import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';

const Book = () => {
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
        <Text style={styles.textHeader}>Send Package</Text>
      </View>
    );
  };

  const EditText = props => {
    return (
      <View style={styles.viewinput}>
        <Text style={styles.textinput}>{props.text}</Text>
        <TextInput
          placeholder={props.placeholder}
          style={styles.edittextinput}
        />
      </View>
    );
  };
  return (
    <View>
      <Header />
      <EditText text={'Input Pickup Address'} placeholder={'Pickup Address'} />
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
  viewinput: {margin: 10, paddingLeft: 15},
});
