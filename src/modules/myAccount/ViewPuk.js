import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from "react-native";
import OTPInput from "../../components/OTPInput";
import { colors, fonts } from "../../styles";
import PrimaryButton from "../../components/PrimaryButton";

const ViewPuk = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>PUK number</Text>
        <Text style={styles.msgText}>{`Remeber never share your PUK\nnumber or PIN with anyone.\nSIM PUK number for ${'0691002022'} is:`}</Text>
      </View>
      <OTPInput />
      <View style={{flex: 1, justifyContent:'flex-end'}}>
      <PrimaryButton
       title={'Done'}
       background={colors.green}
       color={'#fff'}
       navigation={()=>navigation.goBack()}
      />
      </View>
    </SafeAreaView>
  )
}
export default ViewPuk;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 40
  },
  body: {
    marginHorizontal: 40
  },
  header: {
    fontSize: 22,
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
    paddingVertical: 20
  },
  msgText: {
    color: colors.gray,
    lineHeight: 18,
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
  }
})