import React, { useEffect } from "react";
import { connect } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";
import HeaderSection from "../../components/HeaderSection";
import PhoneIcon from '../../images/phoneIcon.png';
import ForwardIcon from 'react-native-vector-icons/MaterialIcons';
import FlexCard from "../../components/FlexCard";
import Tick from '../../images/tick.png'
import PrimaryButton from "../../components/PrimaryButton";
import { colors } from "../../styles";
import VR from "../../components/VR";
import {
  getTopupStartProcess,
} from '../home/home';
import { PageLoader } from "../../components";

const titles = {
  AIRTIME: 'Topup Airtime',
  VOICE: 'Topup VOICE',
  DATA: 'Topup DATA',
}

const voiceTabs = [
  {
    key: 'ANY_NETWORK',
    label: 'Any Network'
  },
  {
    key: 'TELKOM_MOBILE',
    label: 'Telkom Mobile'
  },
  {
    key: 'TELKOM_LANDLINE',
    label: 'Telkom Landline'
  },
];

const dataTabs = [];

const airtimeTabs = [];

const AirTimePayment = ({
  route,
  navigation,
  loading,
  topupStartProcess,
  getTopupStartProcess,
}) => {
  const { product, topUpType } = route.params;

  console.log('AirTimePayment--------->', topupStartProcess);

  useEffect(() => {
    // getTopupStartProcess({
    //   donorMsisdn: product.serviceId,
    //   targetMsisdn: product.serviceId,
    //   topUpType: topUpType,
    // });
  }, []);
  // console.log('product........', typeof product, product)
  return (
    <View style={{ flex: 1, }}>
      <PageLoader loading={loading} />
      <HeaderSection />
      <View style={styles.container}>
        <Text style={styles.header}>{titles[topUpType]}</Text>
        <FlexCard
          leftIcon={<Image source={Tick} style={{ width: 30, height: 30 }} />}
          text={product?.serviceId || ''}
          hepingText={''}
          rightIcon={<ForwardIcon name="keyboard-arrow-right" size={30} color='#0083c2' />}
        />
        <VR />
        <FlexCard
          leftIcon={<Image source={Tick} style={{ width: 30, height: 30 }} />}
          text={5 || ''}
          hepingText={''}
          rightIcon={<ForwardIcon name="keyboard-arrow-right" size={30} color='#0083c2' />}
        />
        <VR />
        <FlexCard
          leftIcon={<Image source={Tick} style={{ width: 30, height: 30 }} />}
          text={'Card' || ''}
          hepingText={''}
          rightIcon={<ForwardIcon name="keyboard-arrow-right" size={30} color='#0083c2' />}
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 80, }}>
        <View style={{ flex: 0.5, }}>
          <PrimaryButton title={'Back'} navigation={() => navigation.goBack()} />
        </View>
        <View style={{ flex: 0.5 }}>
          <PrimaryButton title={'Pay'} background={colors.secondary} color={'#fff'} />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    // fontFamily: fonts.primaryExtraBold,
    color: '#0083c2',
    paddingVertical: 10
  },
});

export default connect(
  state => {
    return {
      loading: state.home.loading,
      topupStartProcess: state.home.topupStartProcess,
    };
  }, {
  getTopupStartProcess,
}
)(AirTimePayment);