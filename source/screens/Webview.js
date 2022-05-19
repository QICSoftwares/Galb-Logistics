import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';

const Webview = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {link} = route.params;

  return (
    <WebView
      source={{uri: link}}
      style={{flex: 1}}
      onShouldStartLoadWithRequest={request => {
        let url = request.url;
        console.log(url);
        if (url.startsWith('https://galblogistics.app')) {
          navigation.navigate('Profile', {
            mode: 'Redirect',
            link: url,
          });
          return true;
        }
      }}
    />
  );
};

export default Webview;

const styles = StyleSheet.create({});
