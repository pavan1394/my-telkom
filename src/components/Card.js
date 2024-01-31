import React from "react";
import { connect } from 'react-redux';

import { StyleSheet, View, Text, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fonts } from "../styles";
import {
  setSelectedProductType,
  setSelectedBundleType,
  setSelectedBundle,
  setSelectedPaymentMethod,
} from '../modules/home/home';

const CardRender = ({
  data,
  setSelectedProductType,
  setSelectedBundleType,
  setSelectedBundle,
  setSelectedPaymentMethod,
}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, i) => i.toString()}
      ItemSeparatorComponent={() => <View style={{ margin: 12 }} />}
      renderItem={({ item, i }) => {
        return (
          <View style={styles.cardWrapper} key={i}>
            <TouchableOpacity
              style={styles.card} onPress={() => {
                if (item.onPress) {
                  item.onPress();
                  setSelectedProductType('')
                  setSelectedBundleType('')
                  setSelectedBundle('')
                  setSelectedPaymentMethod('')
                }
              }}>
              <View>{item.icon}</View>
              <Text style={{ fontSize: 11, color: '#000', marginTop: 20, fontFamily: fonts.primaryRegular, }}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )
      }}
      numColumns={3}
    />
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 5

  },
  card: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
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
  setSelectedProductType,
  setSelectedBundleType,
  setSelectedBundle,
  setSelectedPaymentMethod,
}
)(CardRender);
