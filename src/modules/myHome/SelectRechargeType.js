import React, { useEffect } from "react";
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PrimaryButton from "../../components/PrimaryButton";
import { colors, fonts } from "../../styles";
import {
  getTopupStartProcess,
  setSelectedProductType,
  setSelectedBundleType,
  setSelectedBundle,
  setSelectedPaymentMethod,
} from '../home/home';
import { PageLoader } from "../../components";

const voiceTabs = ['Any Network', 'Telkom Mobile', 'Telkom Landline'];


const SelectRechargeType = ({
  route,
  navigation,
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

  let data = [];
  let uniqueMad4WebCatagoriesSet = [];

  if (topUpType == 'VOICE') {
    data = (topupStartProcess?.eligibilityResponse?.offers || []).filter(o => voiceTabs.includes(o.mad4WebSubCatagory));
    uniqueMad4WebCatagoriesSet = [...new Set(data.map(obj => obj.mad4WebSubCatagory))];
  } else if (topUpType == 'DATA') {
    data = (topupStartProcess?.eligibilityResponse?.offers || []);
    uniqueMad4WebCatagoriesSet = [...new Set(data.map(obj => obj.mad4WebCatagory))];
  }



  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', }}>
      <HeaderSection />
      <PageLoader loading={loading} />
      <View style={styles.container}>
        <Text style={styles.header}>{`Topup ${topUpType} Minutes`}</Text>
        {uniqueMad4WebCatagoriesSet.map((obj) => {
          // const productTypes = types.productTypes
          return (
            <View key={obj}>
              <FlexCard
                navigation={() => {
                  setSelectedProductType(obj);
                  setSelectedBundleType('');
                  setSelectedBundle('');
                  setSelectedPaymentMethod('');
                  navigation.goBack();
                }}
                leftIcon={<MaterialIcons name="swap-vert" size={30} color='#0083c2' />}
                text={obj}
                rightIcon={<MaterialIcons name="keyboard-arrow-right" size={30} color='#0083c2' />}

              />
            </View>
          )
        })}
      </View>
      <View style={{ paddingTop: 80, flexDirection: 'row' }}>
        <View style={{ flex: 0.5 }}>
          <PrimaryButton title={'Back'} navigation={() => navigation.goBack()} />
        </View>
        <View style={{ flex: 0.5 }}>
          <PrimaryButton title={'Pay'} disabled={true} />
        </View>
      </View>
    </ScrollView>
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
      topupStartProcess: state.home.topupStartProcess,
    };
  }, {
  getTopupStartProcess,
  setSelectedProductType,
  setSelectedBundleType,
  setSelectedBundle,
  setSelectedPaymentMethod,
}
)(SelectRechargeType);
