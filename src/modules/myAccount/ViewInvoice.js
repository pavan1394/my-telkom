import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import HeaderSection from "../../components/HeaderSection";
import { colors, fonts } from "../../styles";

const ViewInvoice = ({ navigation }) => {
  return (
    <View style={{ flex: 1, }}>
      <ScrollView>
        <HeaderSection />
        <View style={styles.container}>
          <Text style={styles.headerText}>{'September 2023'}</Text>
          <Text style={styles.bodyText}>{'You do not have an existing Invoice for the selected month.'}</Text>
          <Text></Text>
        </View>
      </ScrollView>
      <PrimaryButton
        title={'Back'}
        navigation={() => navigation.goBack()}
      />
    </View>

  )
}
export default ViewInvoice

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20
  },
  headerText: {
    fontSize: 22,
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
    paddingVertical: 10
  },
  bodyText: {
    color: colors.black,
    fontSize: 12,
    fontFamily: fonts.primaryRegular,
  }

})