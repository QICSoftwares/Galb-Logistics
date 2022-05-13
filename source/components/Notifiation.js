import React from 'react';
import {View, Button} from 'react-native';
import {ALERT_TYPE, Dialog, Root, Toast} from 'react-native-alert-notification';

export const NotificationDialog = () => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Success',
    textBody: 'Congrats! this is dialog box success',
    button: 'close',
  });
};
