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
  setSelectedBundle,
  setSelectedPaymentMethod,
} from '../home/home';
import { PageLoader } from "../../components";

const airtimeBundles = [
  {
    bundleName: '5',
    catalogName: '5',
    expirationDate: '2024-02-02 13:56:53',
    mad4WebCatagory: 'Minutes',
    mad4WebSubCatagory: 'Any Network',
    price: 5,
    productId: '6664',
    resultMessage: null,
    spCode: 'S2740',
    validity: '7 Days',
    webBundleName: '10 All-net minutes',
    webCatagory: 'Once-off All Net Voice Minutes'
  },
  {
    bundleName: '10',
    catalogName: '10',
    expirationDate: '2024-02-02 13:56:53',
    mad4WebCatagory: 'Minutes',
    mad4WebSubCatagory: 'Any Network',
    price: 10,
    productId: '6665',
    resultMessage: null,
    spCode: 'S2740',
    validity: '7 Days',
    webBundleName: '10 All-net minutes',
    webCatagory: 'Once-off All Net Voice Minutes'
  },
  {
    bundleName: '15',
    catalogName: '15',
    expirationDate: '2024-02-02 13:56:53',
    mad4WebCatagory: 'Minutes',
    mad4WebSubCatagory: 'Any Network',
    price: 15,
    productId: '6666',
    resultMessage: null,
    spCode: 'S2740',
    validity: '7 Days',
    webBundleName: '10 All-net minutes',
    webCatagory: 'Once-off All Net Voice Minutes'
  },
  {
    bundleName: '20',
    catalogName: '20',
    expirationDate: '2024-02-02 13:56:53',
    mad4WebCatagory: 'Minutes',
    mad4WebSubCatagory: 'Any Network',
    price: 20,
    productId: '6667',
    resultMessage: null,
    spCode: 'S2740',
    validity: '7 Days',
    webBundleName: '10 All-net minutes',
    webCatagory: 'Once-off All Net Voice Minutes'
  },
  {
    bundleName: '30',
    catalogName: '30',
    expirationDate: '2024-02-02 13:56:53',
    mad4WebCatagory: 'Minutes',
    mad4WebSubCatagory: 'Any Network',
    price: 30,
    productId: '6668',
    resultMessage: null,
    spCode: 'S2740',
    validity: '7 Days',
    webBundleName: '10 All-net minutes',
    webCatagory: 'Once-off All Net Voice Minutes'
  },
  {
    bundleName: '50',
    catalogName: '50',
    expirationDate: '2024-02-02 13:56:53',
    mad4WebCatagory: 'Minutes',
    mad4WebSubCatagory: 'Any Network',
    price: 50,
    productId: '6669',
    resultMessage: null,
    spCode: 'S2740',
    validity: '7 Days',
    webBundleName: '10 All-net minutes',
    webCatagory: 'Once-off All Net Voice Minutes'
  },
];

const SelectBundleSize = ({
  route,
  navigation,
  loading,
  topupStartProcess,
  selectedProduct,
  selectedBundleType,
  selectedBundle,
  selectedPaymentMethod,
  setSelectedBundle,
  setSelectedPaymentMethod,
}) => {

  const { topUpType, } = route?.params || {};
  let data = [];
  if (topUpType == 'VOICE') {
    data = (topupStartProcess?.eligibilityResponse?.offers || []).filter(o => o.mad4WebSubCatagory == selectedProduct);
  } else if (topUpType == 'DATA') {
    data = (topupStartProcess?.eligibilityResponse?.offers || []).filter(o => o.mad4WebCatagory == selectedProduct).filter(o => o.mad4WebSubCatagory == selectedBundleType);
  } else if (topUpType == 'AIRTIME') {
    data = airtimeBundles;
  }

  console.log('SelectBundleSize------->', topUpType, selectedProduct, data);


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', }}>
      <HeaderSection />
      <PageLoader loading={loading} />
      <View style={styles.container}>
        <Text style={styles.header}>{`Topup Data`}</Text>
        {data.map((obj) => {
          // const productTypes = types.productTypes
          return (
            <View key={obj.productId}>
              <FlexCard
                navigation={() => {
                  setSelectedBundle(obj);
                  setSelectedPaymentMethod('');
                  navigation.goBack()
                }}
                leftIcon={null}
                text={`${obj.bundleName} mins`}
                hepingText={`R ${obj.price}`}
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
      topupStartProcess: state.home.topupStartProcess,
      selectedProduct: state.home.selectedProduct,
      selectedBundleType: state.home.selectedBundleType,
      selectedBundle: state.home.selectedBundle,
      selectedPaymentMethod: state.home.selectedPaymentMethod,
    };
  }, {
  setSelectedBundle,
  setSelectedPaymentMethod,
}
)(SelectBundleSize);
