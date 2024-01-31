import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";
import HeaderSection from "../../components/HeaderSection";
import PhoneIcon from '../../images/phoneIcon.png';
import ForwardIcon from 'react-native-vector-icons/MaterialIcons';
import FlexCard from "../../components/FlexCard";
import Tick from '../../images/tick.png'
import PrimaryButton from "../../components/PrimaryButton";
import { colors, fonts } from "../../styles";
import VR from "../../components/VR";

const ProductPayment = ({ route, navigation }) => {
  const { options, topUpType } = route.params;
  return (
    <View>
      <HeaderSection/>
      <View style={styles.container}>
        <Text style={styles.header}>Topup Data</Text>
        {options.map((option, i) => {
          console.log('option......',options.length,i)
          return (
            <View key={i}>
              <FlexCard
                leftIcon={<Image source={Tick} style={{ width: 30, height: 30 }} />}
                text={option.payment || ''}
                hepingText={''}
                rightIcon={<ForwardIcon name="keyboard-arrow-right" size={30} color='#0083c2' />}
              />
               {i !== options.length - 1 && <VR />}
            </View>
          )
        })}
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <View style={{ flex: 0.5 }}>
          <PrimaryButton title={'Back'} navigation={() => navigation.goBack()} />
        </View>
        <View style={{ flex: 0.5 }}>
          <PrimaryButton title={'Pay'} background={colors.secondary} color={'#fff'} />
        </View>
      </View>
    </View>
  )
}
export default ProductPayment;

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
})