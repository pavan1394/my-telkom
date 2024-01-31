import React, { useEffect } from "react";
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import UserIcon from 'react-native-vector-icons/Feather';
import ForwardIcon from 'react-native-vector-icons/MaterialIcons';
import PrimaryButton from "../../components/PrimaryButton";
import {
  getBillingAccounts,
} from '../home/home';
import { PageLoader } from "../../components";
import { fonts } from "../../styles";


const PaymentHistory = ({
  navigation,
  loading,
  billingAccounts,
  getBillingAccounts,
}) => {

  useEffect(() => {
    getBillingAccounts();
  }, []);

  console.log('billingAccounts', billingAccounts);
  return (
    <>
      <PageLoader loading={loading} />
      <View style={{ flex: 1, }}>
        {
          (billingAccounts || []).map((account) => {
            return (
              <TouchableOpacity
                key={String(account.id)}
                onPress={() => navigation.navigate('PaymentDetails', { account })}
                style={styles.paymentCard}>
                <View style={styles.user}>
                  <UserIcon size={30} name='user' color='#0083c2' />
                  <View style={{ marginLeft: 20 }}>
                    <Text style={styles.userName}>{account.name.length > 15 ? account.name.slice(0, 15) + '...' : account.name}</Text>
                    <Text style={{ color: '#0083c2', fontFamily: fonts.primaryRegular, }}>{account.id}</Text>
                  </View>
                </View>
                <View>
                  <ForwardIcon name="keyboard-arrow-right" size={30} color='#0083c2' />
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
      <View>
        <PrimaryButton
          title={'Back'}
          navigation={() => navigation.goBack()}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  user: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  userName: {
    color: '#0083c2',
    fontSize: 14,
    fontFamily: fonts.primaryMedium,
  }
});

export default connect(
  state => {
    return {
      billingAccounts: state.home.billingAccounts || [],
      loading: state.home.loading,
    };
  }, {
  getBillingAccounts,
}
)(PaymentHistory);