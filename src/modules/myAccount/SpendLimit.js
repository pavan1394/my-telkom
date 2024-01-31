import React, { useEffect } from "react";
import { connect } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import HeaderSection from "../../components/HeaderSection";
import { colors, fonts } from "../../styles";
import { PageLoader, TextInput } from "../../components";
import PrimaryButton from "../../components/PrimaryButton";
import {
  getSpendLimitDetails
} from '../home/home';

const limitType = [
  {
    key: 'currentLimit',
    type: 'Credit',
    value: '0.00',
  },
  {
    key: 'usedLimit',
    type: 'Spend',
    value: '0.00'
  },
]
const SpendLimit = ({
  navigation,
  loading,
  spendLimit,
  getSpendLimitDetails,
}) => {

  useEffect(() => {
    getSpendLimitDetails();
  }, []);

  return (
    <View style={{ flex: 1, }}>
      <PageLoader loading={loading} />
      <ScrollView>
        <HeaderSection />
        <View style={styles.container}>
          <Text style={styles.headerText}>Set Spend Limit</Text>
          {limitType.map((type) => {
            return (
              <View style={styles.limitData} key={type.key}>
                <Text
                  style={[styles.limitDataText, { fontFamily: fonts.primaryMedium, }]}>
                  {`Current ${type.type} Limit`}</Text>
                <Text style={styles.limitDataText}>{`R ${(spendLimit?.spendLimit || {})[type.key] || ''}`}</Text>
              </View>
            )
          })}
          <View style={{ marginVertical: 20 }}>
            <Text style={{ color: 'green', fontFamily: fonts.primaryRegular, paddingBottom: 10, }}>{'Enter new spend limit'}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "red" }}>
              <TextInput
                style={styles.inputStyle}
                placeholderTextColor='green'
                placeHolder={'R 0.00'}
                underlineColorAndroid='green'
              />
              <View style={{ alignSelf: 'center', paddingRight: 5, }}>
                <Image source={require('../../images/tick.png')} style={{ width: 20, height: 20, }} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <PrimaryButton
        title={'Back'}
        navigation={() => navigation.goBack()}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  headerText: {
    fontSize: 22,
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
    // paddingVertical: 20
  },
  limitData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  limitDataText: {
    color: '#0083c2',
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
  },
  inputStyle: {
    flex: 1,
    borderColor: 'green',
    backgroundColor: 'green'
  }
});

export default connect(
  state => {
    return {
      loading: state.home.loading,
      spendLimit: state.home.spendLimit,
    };
  }, {
  getSpendLimitDetails,
}
)(SpendLimit);