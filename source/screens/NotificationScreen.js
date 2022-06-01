import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/Colors';
import {Notifications} from 'react-native-notifications';

const NotificationScreen = () => {
  const navigation = useNavigation();
  Notifications.events().registerNotificationReceivedForeground(
    (notification, completion) => {
      console.log('Notification Received - Foreground', notification.payload);

      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({alert: true, sound: true, badge: false});
    },
  );

  Notifications.events().registerNotificationOpened(
    (notification, completion, action) => {
      console.log('Notification opened by device user', notification.payload);
      console.log(
        `Notification opened with an action identifier: ${action.identifier} and response text: ${action.text}`,
      );
      completion();
    },
  );

  Notifications.events().registerNotificationReceivedBackground(
    (notification, completion) => {
      console.log('Notification Received - Background', notification.payload);

      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({alert: true, sound: true, badge: false});
    },
  );

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
      <Header />
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
