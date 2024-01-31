import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import HeaderSection from "../../components/HeaderSection";
import PrimaryButton from "../../components/PrimaryButton";
import { fonts } from "../../styles";
const Upgrades = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderSection />
        <View style={styles.contentContainer}>
          <View style={styles.upgrageBody}>
            <Text style={styles.headerText}>Upgrades status:</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
              <Text style={styles.bodyText}>No upcoming upgrade</Text>
              <Image source={require('../../images/star.png')} style={{ width: 15, height: 15, marginLeft: 20 }} />
            </View>
            <Text style={{ fontSize: 15, color: '#000', lineHeight: 20, fontFamily: fonts.primaryRegular, }}>{'Please note that you need 3 months or less\nremaining on your contract to qualify for an\nupgrade'}</Text>
          </View>
          <View style={styles.info}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#809397',
              padding: 10
            }}>
              <Text style={styles.infoText}>Monthly Remaining</Text>
              <Text style={{ color: '#0083c2', fontFamily: fonts.primaryRegular }}>7</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // borderTopWidth: 1, 
              borderBottomWidth: 1,
              borderColor: '#809397',
              padding: 10
            }}>
              <Text style={styles.infoText}>Contract Expiry Date</Text>
              <Text style={{ color: '#0083c2', fontFamily: fonts.primaryRegular }}>27/04/2024</Text>
            </View>
          </View>
        </View>
        {/* <TouchableOpacity style={styles.btn} onPress={()=>navigation.goBack()}>
        <Text style={{ textAlign: 'center', color: '#0083c2', fontWeight: '500' }}>Back</Text>
      </TouchableOpacity> */}
      </ScrollView>
      <PrimaryButton
        title={'Back'}
        navigation={() => navigation.goBack()}
      />
    </SafeAreaView>
  )
}
export default Upgrades

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  contentContainer: {
    flex: 1
  },
  headerText: {
    fontSize: 18,
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
    paddingVertical: 20
  },
  upgrageBody: {
    marginHorizontal: 30
  },
  bodyText: {
    fontSize: 16,
    fontFamily: fonts.primaryMedium,
    color: '#26292E'
  },
  info: {
    paddingHorizontal: 30,
    marginTop: 30
  },
  infoText: {
    fontSize: 14,
    fontFamily: fonts.primaryMedium,
    color: '#0083c2',
  },
  btn: {
    borderWidth: 2,
    padding: 15,
    borderRadius: 30,
    borderColor: '#0083c2',
    marginHorizontal: 20,
    marginBottom: 90
  }
})