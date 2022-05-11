import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/Colors';

const NotificationScreen = () => {
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
        <Text style={styles.textHeader}>Navigation</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>NotificationScreen</Text>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  textHeader: {
    fontFamily: 'MavenPro-Bold',
    fontSize: 23,
    color: Colors.black,

    marginLeft: 15,
  },
});
