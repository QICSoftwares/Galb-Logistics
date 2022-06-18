import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import box from '../../assets/images/box.png';

const Item = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#02161D',
        padding: 8,
        borderRadius: 10,
        height: 90,
        alignItems: 'center',
      }}>
      <Image
        source={box}
        resizeMode={'contain'}
        style={{height: 60, width: 60, marginHorizontal: 5}}
      />
      <View style={{paddingVertical: 0, flex: 1, height: '100%'}}>
        <Text style={{fontFamily: 'MavenPro-Regular', color: Colors.white}}>
          Delivery Details
        </Text>
        <Text style={{fontFamily: 'MavenPro-Medium', color: Colors.white}}>
          22 Enemosah Street Abule Osun, Ojo Lagos
        </Text>
        <Text style={{fontFamily: 'MavenPro-SemiBold', color: Colors.white}}>
          081 5757 3443
        </Text>
      </View>
    </View>
  );
};

const Bar = () => {
  return (
    <View
      style={{
        paddingVertical: 16,
        width: '100%',
      }}>
      <View
        style={{
          backgroundColor: Colors.primary,
          width: 50,
          height: 5,
          borderRadius: 360,
          alignSelf: 'center',
        }}></View>
    </View>
  );
};

const Status = () => {
  return (
    <View
      style={{
        paddingVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 15,
      }}>
      <ActivityIndicator size="small" color={Colors.primary} />
      <Text style={{fontFamily: 'MavenPro-SemiBold', marginLeft: 10}}>
        Your Package Is On The Move
      </Text>
    </View>
  );
};

const Progress = () => {
  return (
    <View style={{flex: 1}}>
      <ProgressSteps
      activeStep={2}
        nextBtnDisabled={true}
        activeStepIconBorderColor={Colors.primary}
        completedProgressBarColor={Colors.primary}
        activeLabelColor={Colors.primary}
        labelFontFamily={'MavenPro-Regular'}>
        <ProgressStep label="Pickup" removeBtnRow={true}></ProgressStep>
        <ProgressStep
          label="Sorting At Station"
          removeBtnRow={true}></ProgressStep>
        <ProgressStep
          label="Out For Delivery"
          removeBtnRow={true}></ProgressStep>
        <ProgressStep
          label="Package Delivered"
          removeBtnRow={true}></ProgressStep>
      </ProgressSteps>
    </View>
  );
};
const Orders = details => {
  console.log('Ordes', details);
  return (
    <View style={styles.container}>
      <Bar />
      <Status />
      <Progress />
      <Item />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,

    height: '100%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },
});
