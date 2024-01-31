import React, { useEffect } from "react";
import { connect } from 'react-redux';

import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView
} from 'react-native';
import PrimaryButton from "../../components/PrimaryButton";
import {
  getPaymentHistoryDetails,
} from '../home/home';
import { PageLoader } from "../../components";
import CommonHeader from "../navigation/CommonHeader";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fonts } from "../../styles";

const labels = ['Date', 'Amount', 'Method']

const PaymentDetails = ({
  route,
  navigation,
  loading,
  paymentHistory,
  getPaymentHistoryDetails,
}) => {

  const { account, } = route.params;

  useEffect(() => {
    getPaymentHistoryDetails({
      baNumber: account.banNumber,
      endPeriod: 202309,
      startPeriod: 202304
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <CommonHeader
        leftText={account.customName}
        leftIcon={<FontAwesome name='user-circle' size={30} color='#fff' />}
        subTitle={account.accountId}
        rightIcon={<AntDesign name='setting' size={30} color='#fff' />} />
      <PageLoader loading={loading} />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerText}>{'Payment History'}</Text>
          <View style={styles.labelContainer}>
            {labels.map((label, i) => {
              return (
                <View style={styles.labelTextContainer} key={i}>
                  <Text style={styles.labelStyle}>{label}</Text>
                </View>
              )
            })}
          </View>
          {(paymentHistory || []).map((paymeny, i) => (
            <View key={i} style={styles.body}>
              <Text style={{ color: '#000', fontFamily: fonts.primaryMedium, }}>{paymeny.date}</Text>
              <View style={{ flex: 1 }} />
              <Text style={{ color: '#000', fontFamily: fonts.primaryMedium, }}>{`R ${paymeny.amount}`}</Text>
              <View style={{ flex: 1 }} />
              <Text style={{ color: '#000', fontFamily: fonts.primaryMedium, }}>{paymeny.paymentMethod}</Text>
            </View>
          ))}

        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <PrimaryButton title={'Back'} navigation={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    elevation: 6,
    margin: 10,
    padding: 10
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  labelStyle: {
    textAlign: 'center',
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
    // textDecorationLine: 'underline',
    fontSize: 16
  },
  labelTextContainer: {
    borderBottomWidth: 2,
    borderColor: '#0083c2'
  }
});

export default connect(
  state => {
    return {
      paymentHistory: state.home.paymentHistory,
      loading: state.home.loading,
    };
  }, {
  getPaymentHistoryDetails,
}
)(PaymentDetails);