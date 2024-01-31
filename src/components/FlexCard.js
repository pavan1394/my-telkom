import React from "react";
import { connect } from 'react-redux';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { colors, fonts } from "../styles";

const FlexCard = ({
  leftIcon,
  text,
  hepingText,
  rightIcon,
  page,
  navigation,
  selectedProduct,
  selectedBundleType,
  selectedBundle,
  topUpType,
  selectedPaymentMethod,
}) => {
  let check = false;
  if (topUpType == 'VOICE') {
    check = text == 'Select Bundle Size' ? selectedProduct ? false : true : text == 'Select Payment Method' ? (selectedProduct && selectedBundle) ? false : true :  false;
  } else if (topUpType == 'DATA') {
    check = text == 'Select Bundle Type' ? selectedProduct ? false : true : text == 'Select Bundle Size' ? (selectedProduct && selectedBundleType) ? false : true :  text == 'Select Payment Method' ? (selectedProduct && selectedBundleType && selectedBundle) ? false : true :  false;
  } else if (topUpType == 'AIRTIME') {
    check = text == 'Select Bundle Size' ? selectedProduct ? false : true : text == 'Select Payment Method' ? (selectedProduct && selectedBundle) ? false : true :  false;
  }
  console.log('FlexCard check---------->', check, selectedBundle)
  return (
    <View>
      <TouchableOpacity
        onPress={navigation}
        disabled={check}
        style={[styles.paymentCard, check ? {backgroundColor: '#eee', } : {}]}>
        <View style={styles.user}>
          <View>{leftIcon}</View>
          <View style={{ marginLeft: 20, justifyContent:'center' }}>
            {text ?
              <Text style={styles.userName}>{text.length > 20 ? text.slice(0, 20) + '...' : text}</Text>
              : null
            }
            {hepingText ?
              <Text style={{ color: page ? colors.grey : '#0083c2', fontFamily: fonts.primaryRegular, }}>{hepingText ? hepingText : null}</Text>
              : null
            }
          </View>
        </View>
        <View>
          {rightIcon}
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 30,
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
      loading: state.home.loading,
      selectedProduct: state.home.selectedProduct,
      selectedBundleType: state.home.selectedBundleType,
      selectedBundle: state.home.selectedBundle,
      selectedPaymentMethod: state.home.selectedPaymentMethod,
    };
  }, {
}
)(FlexCard);


