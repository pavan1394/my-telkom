import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import HeaderSection from "../../components/HeaderSection";
import FlexCard from "../../components/FlexCard";
import LeftIocn from 'react-native-vector-icons/MaterialIcons';
import ForwardIcon from 'react-native-vector-icons/MaterialIcons';
import PrimaryButton from "../../components/PrimaryButton";
import { fonts } from "../../styles";

// const productTypes = [
//   {
//     type: 'Data Bundless'
//   },
//   {
//     type: 'Telkom Mobile Data'
//   },
//   {
//     type: 'Data Bundless'
//   },
//   {
//     type: 'Streaming Bundless'
//   },
// ]

const SelectProductTypes = ({ navigation, route }) => {
  const { productTypes, topUpType } = route.params || [];
  // console.log('products......',productTypes)
  return (
    <View>
      <HeaderSection />
      <View style={styles.container}>
        <Text style={styles.header}>{'Select Product Type'}</Text>
        {(productTypes || []).map((product, i) => {
          const options = product.options;
          console.log('options.......', options)
          return (
            <TouchableOpacity key={i}>
              <FlexCard
                navigation={() => navigation.navigate('ProductPayment', { options, topUpType })}
                text={product.type}
                // hepingText={'fghjk'}
                leftIcon={<LeftIocn name='compare-arrows' size={30} color='#0083c2' />}
                rightIcon={<ForwardIcon name="keyboard-arrow-right" size={30} color='#0083c2' />}
              />
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={{ marginTop: 20 }}>
        <PrimaryButton title={'Back'} navigation={() => navigation.goBack()} />
      </View>
    </View>
  )
}
export default SelectProductTypes

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30
  },
  header: {
    fontSize: 20,
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
    paddingVertical: 10
  }
})