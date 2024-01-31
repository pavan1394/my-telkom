import React, { useEffect, } from "react";
import { connect } from 'react-redux';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  opacity,
  ScrollView
} from 'react-native';
import HeaderSection from "../../components/HeaderSection";
import FlexCard from "../../components/FlexCard";
import ForwardIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PrimaryButton from "../../components/PrimaryButton";
import { colors, fonts } from "../../styles";
import {
  getTopupStartProcess,
} from '../home/home';
import { PageLoader } from "../../components";

const selectTypes = [
  {
    id: 1,
    type: 'Select Product Type',
    screen: 'SelectRechargeType',
  },
  {
    id: 2,
    type: 'Select Bundle Size',
    screen: 'SelectBundleSize',
  },
  {
    id: 3,
    type: 'Select Payment Method',
  },
];


const TopUpVoice = ({
  route,
  navigation,
  loading,
  selectedServiceId,
  selectedProduct,
  selectedBundle,
  selectedPaymentMethod,
  getTopupStartProcess,
}) => {

  const { topUpType } = route?.params || {};

  useEffect(() => {
    getTopupStartProcess({
      donorMsisdn: selectedServiceId,
      targetMsisdn: selectedServiceId,
      topUpType: topUpType,
    });
  }, []);

  const renderLeftIcon = (id) => {
    return (
      <View style={styles.leftIcon}>
        <Text style={{ color: '#0083c2', fontFamily: fonts.primaryMedium, }}>{id}</Text>
      </View>
    )
  }

  return (
    <>
      <PageLoader loading={loading} />
      <ScrollView style={{ flex: 1, }}>
        <HeaderSection />
        <View style={styles.container}>
          <Text style={styles.header}>Topup Voice Minutes</Text>
          {selectTypes.map((obj, i) => {
            const id = obj.id;
            return (
              <View key={i}>
                <FlexCard
                  navigation={() => {
                    if (obj.screen) {
                      navigation.navigate(obj.screen, { topUpType });
                    }
                  }}
                  leftIcon={obj.type == 'Select Product Type' ? (selectedProduct ? <AntDesign name="checkcircle" size={30} color='#008000' /> : renderLeftIcon(id)) : obj.type == 'Select Bundle Size' ? (selectedBundle ? <AntDesign name="checkcircle" size={30} color='#008000' /> : renderLeftIcon(id)) : obj.type == 'Select Payment Method' ? selectedPaymentMethod ? <AntDesign name="checkcircle" size={30} color='#008000' /> : renderLeftIcon(obj.id) : renderLeftIcon(id)}
                  text={obj.type == 'Select Product Type' ? selectedProduct ? selectedProduct : obj.type : obj.type == 'Select Bundle Size' ? selectedBundle ? `${selectedBundle.bundleName} mins.` : obj.type : obj.type == 'Select Payment Method' ? selectedPaymentMethod ? selectedPaymentMethod : obj.type : obj.type}
                  rightIcon={<ForwardIcon name="keyboard-arrow-right" size={30} color='#0083c2' />}
                  topUpType={topUpType}
                />
              </View>
            )
          })}
        </View>
        <View style={{ marginTop: 80, flexDirection: 'row' }}>
          <View style={{ flex: 0.5 }}>
            <PrimaryButton title={'Back'} navigation={() => navigation.goBack()} />
          </View>
          <View style={{ flex: 0.5 }}>
            <PrimaryButton title={'Pay'} disabled={true} />
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30
  },
  header: {
    fontSize: 20,
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
    paddingVertical: 10
  },
  leftIcon: {
    borderWidth: 2,
    borderColor: '#0083c2',
    width: 30,
    height: 30,
    borderRadius: (30 * 30) / 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default connect(
  state => {
    return {
      loading: state.home.loading,
      selectedServiceId: state.home.selectedServiceId,
      selectedProduct: state.home.selectedProduct,
      selectedBundle: state.home.selectedBundle,
      selectedPaymentMethod: state.home.selectedPaymentMethod,
    };
  }, {
  getTopupStartProcess,
}
)(TopUpVoice);