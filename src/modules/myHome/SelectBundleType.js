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
  setSelectedBundleType,
  setSelectedBundle,
  setSelectedPaymentMethod,
} from '../home/home';
import { PageLoader } from "../../components";


const SelectBundleType = ({
  route,
  navigation,
  loading,
  topupStartProcess,
  selectedProduct,
  selectedBundle,
  selectedBundleType,
  selectedPaymentMethod,
  setSelectedBundleType,
  setSelectedBundle,
  setSelectedPaymentMethod,
}) => {

  const { topUpType, } = route?.params || {};
  const data = (topupStartProcess?.eligibilityResponse?.offers || []).filter(o => o.mad4WebCatagory == selectedProduct);
  const uniqueSubCat = [...new Set(data.map(obj => obj.mad4WebSubCatagory))];

  console.log('SelectBundleType------->', topUpType, selectedProduct, data);


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', }}>
      <HeaderSection />
      <PageLoader loading={loading} />
      <View style={styles.container}>
        <Text style={styles.header}>Topup Data Minutes</Text>
        {uniqueSubCat.map((obj) => {
          // const productTypes = types.productTypes
          return (
            <View key={obj}>
              <FlexCard
                navigation={() => {
                  setSelectedBundleType(obj);
                  setSelectedBundle('');
                  setSelectedPaymentMethod('');
                  navigation.goBack()
                }}
                leftIcon={null}
                text={`${obj}`}
                // hepingText={`R ${obj.price}`}
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
      selectedBundle: state.home.selectedBundle,
      selectedBundleType: state.home.selectedBundleType,
      selectedPaymentMethod: state.home.selectedPaymentMethod,
    };
  }, {
  setSelectedBundleType,
  setSelectedBundle,
  setSelectedPaymentMethod,
}
)(SelectBundleType);
