
import React from "react";
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import HeaderSection from "../../components/HeaderSection";
import PhoneIcon from '../../images/phoneIcon.png';
import ForwardIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FlexCard from "../../components/FlexCard";
import { TextInput } from "../../components";
import { colors, fonts, } from "../../styles";
import PrimaryButton from "../../components/PrimaryButton";
import {
  getTopupStartProcess,
  setSelectedProductType,
  setSelectedBundleType,
  setSelectedBundle,
  setSelectedPaymentMethod,
} from '../home/home';

const TopupAirTime = ({
  route,
  navigation,
  dashboardData,
  loading,
  selectedServiceId,
  topupStartProcess,
  getTopupStartProcess,
  setSelectedProductType,
  setSelectedBundleType,
  setSelectedBundle,
  setSelectedPaymentMethod,
}) => {

  const { topUpType } = route?.params || {};
  console.log('TopupAirTime------------>', topUpType);
  const assignedProducts = dashboardData?.balances?.assignedProducts || [];

  return (
    <ScrollView>
      <HeaderSection />
      <View style={styles.container}>
        <Text style={styles.header}>Select Number</Text>
        <ScrollView style={{ height: 250 }} showsVerticalScrollIndicator={false}>
          {assignedProducts.map((product, index) => (
            <FlexCard key={index}
              navigation={() => {
                setSelectedProductType(product.serviceId);
                setSelectedBundleType('');
                setSelectedBundle('');
                setSelectedPaymentMethod('');
                navigation.goBack();
              }}
              leftIcon={<Entypo name='mobile' size={30} color={colors.blue} />}
              text={product.customName}
              hepingText={product.serviceId}
              rightIcon={<ForwardIcon name="keyboard-arrow-right" size={30} color='#0083c2' />}
              page={'home'}
            />
          ))}
        </ScrollView>
        <Text style={{ color: '#0083c2', fontFamily: fonts.primaryRegular, }}>{'Other, please specify'}</Text>
        <TextInput
          style={{ marginVertical: 30 }}
          underlineColorAndroid={colors.black}
        />
      </View>
      {/* <PrimaryButton
        title={'Next'}
        disabled={true}
        navigation={() => navigation.navigate('AirTimePayment', { product, topUpType })}
      /> */}
      <PrimaryButton
        title={'Back'}
        navigation={() => navigation.goBack()} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 20
  },
  header: {
    fontSize: 20,
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
    paddingVertical: 10
  }
});

export default connect(
  state => {
    return {
      dashboardData: state.home.dashboardData,
      loading: state.home.loading,
      selectedServiceId: state.home.selectedServiceId,
      topupStartProcess: state.home.topupStartProcess,
    };
  }, {
  getTopupStartProcess,
  setSelectedProductType,
  setSelectedBundleType,
  setSelectedBundle,
  setSelectedPaymentMethod,
}
)(TopupAirTime);