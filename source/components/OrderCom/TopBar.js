import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import logoround from '../../assets/images/logoround.png';
import Icon, {Icons} from '../Icons';
import Colors from '../../constants/Colors';
import {SCREEN_WIDTH} from '../../constants/Variables';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const TopBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          type={Icons.MaterialIcons}
          name={'arrow-back'}
          color={Colors.black}
          size={30}
        />
      </TouchableOpacity>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'MavenPro-Bold',
            fontSize: 20,
            color: Colors.black,
          }}>
          Galb Logitics
        </Text>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
