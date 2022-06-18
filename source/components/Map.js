import MapView, {PROVIDER_GOOGLE, Circle, Marker} from 'react-native-maps';
import {
  StyleSheet,
  Alert,
  View,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants/Variables';
import Geolocation from 'react-native-geolocation-service';
import DropdownAlert from 'react-native-dropdownalert';
import {GOOGLE_MAPS_APIKEY} from '@env';
import MapViewDirections from 'react-native-maps-directions';
import Colors from '../constants/Colors';
import firestore from '@react-native-firebase/firestore';

const Map = props => {
  let dropDownAlertRef = useRef();
  const _map = useRef(null);
  const {uid, orderId, setDetails} = props;
  const [origin, setOrigin] = useState(null);
  const [destination, setDes] = useState(null);
  const [region, setRegion] = useState({
    latitude: 6.465422,
    longitude: 3.406448,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    let subscriber;
    if (!!orderId) {
      subscriber = firestore()
        .collection('Delivery')
        .doc(uid)
        .collection('Orders')
        .doc(orderId)
        .onSnapshot(documentSnapshot => {
          console.log('User data: ', documentSnapshot.data());
          const doc = documentSnapshot.data();
          setDetails(doc);

          setDes({
            latitude: doc.dropoffGeo._latitude,
            longitude: doc.dropoffGeo._longitude,
          });
          if (_map.current) {
            console.log('Animating');
            _map.current.animateCamera(
              {
                center: {
                  latitude: doc.pickupGeo._latitude,
                  longitude: doc.pickupGeo._longitude,
                },
                zoom: 15,
              },
              5000,
            );
          }
          setOrigin({
            latitude: doc.pickupGeo._latitude,
            longitude: doc.pickupGeo._longitude,
          });
        });
    }

    return () => subscriber();
  }, []);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await hasLocationPermission();

      if (!hasPermission) {
        return;
      }
      Geolocation.getCurrentPosition(
        position => {
          console.log(position.coords);
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        error => {
          // See error code charts below.
          Notify('Determining Location Error', error.message, 'error');

          console.log(error.code, error.message);
        },
        {
          // enableHighAccuracy: true,
          timeout: 15000,
          //distanceFilter: 0,
          forceRequestLocation: true,
          forceLocationManager: true,
          showLocationDialog: true,
        },
      );
    };

    getLocation();
  }, []);

  const Notify = (title, message, type) => {
    dropDownAlertRef.alertWithType(type, title, message);
  };

  return (
    <View>
      <MapView
        region={region}
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}>
        {origin === null ? null : (
          <>
            <Marker coordinate={origin} title={'Pickup'}>
              <Image
                source={require('../assets/images/dot.png')}
                style={{height: 17, width: 17}}
              />
            </Marker>
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor={'blue'}
            />
            <Marker coordinate={destination} title={'Dropoff'}>
              <Image
                source={require('../assets/images/dotgreen.png')}
                style={{height: 17, width: 17}}
              />
            </Marker>
          </>
        )}
      </MapView>
      <DropdownAlert
        updateStatusBar={false}
        defaultContainer={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 12,
          margin: 10,
          marginTop: 75,
          borderRadius: 15,
        }}
        messageStyle={{fontFamily: 'MavenPro-Regular', color: 'white'}}
        titleStyle={{fontFamily: 'MavenPro-Bold', color: 'white'}}
        imageStyle={{height: 25, width: 25, alignSelf: 'center'}}
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
