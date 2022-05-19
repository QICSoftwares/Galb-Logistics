import {StyleSheet, StatusBar, View, Text, Button} from 'react-native';
import React, {useRef} from 'react';
import Map from '../components/Map';
import Orders from '../components/OrderCom/Orders';
import BottomSheet from 'reanimated-bottom-sheet';
import TopBar from '../components/OrderCom/TopBar';
import {SCREEN_WIDTH} from '../constants/Variables';

let MARGIN = StatusBar.currentHeight;

const OrderScreen = () => {
  const sheetRef = useRef(null);
  return (
    <View style={{flex: 1}}>
      <Map />
      <View style={styles.topbar}>
        <TopBar />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={['46%', '30%', '12%']}
        borderRadius={10}
        renderContent={Orders}
        initialSnap={1}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  topbar: {
    top: MARGIN,
    position: 'absolute',
    height: 50,
    width: SCREEN_WIDTH,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
