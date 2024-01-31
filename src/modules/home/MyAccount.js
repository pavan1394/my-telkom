import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import CardRender from '../../components/Card';
import HeaderSection from "../../components/HeaderSection";
import MobileIcon from 'react-native-vector-icons/AntDesign';
import UserAccount from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceSetup from 'react-native-vector-icons/SimpleLineIcons';
import Support from 'react-native-vector-icons/MaterialCommunityIcons';
import { fonts } from "../../styles";

const colors = [
  "#26292E",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

const MyAccount = () => {

  const navigation = useNavigation();

  const accountData = [
    {
      icon: <Image source={require("../../images/mobile.png")} style={{ width: 40, height: 40 }} />,
      title: 'View Bill',
    },
    {
      icon: <MobileIcon name={'questioncircleo'} size={30} color='#0083c2' />,
      title: 'Payment History',
      onPress: () => navigation.navigate('PaymentHistory')
    },
    {
      icon: <UserAccount name={'account-reactivate-outline'} size={30} color='#0083c2' />,
      title: 'Set Spend Limit',
      onPress: () => navigation.navigate('SpendLimit')
    },
    {
      icon: <DeviceSetup name={'wrench'} size={30} color='#0083c2' />,
      title: 'View Invoice',
      onPress: () => navigation.navigate('ViewInvoice')
    },
    {
      icon: <Support name={'hand-coin'} size={30} color='#0083c2' />,
      title: 'Account Details',
      onPress: () => navigation.navigate('AccountDetails')
    },
  ];

  const servicesData = [
    {
      icon: <Image source={require("../../images/mobile.png")} style={{ width: 40, height: 40 }} />,
      title: 'Upgrades',
      onPress: () => navigation.navigate('Upgrades')
    },
    {
      icon: <MobileIcon name={'questioncircleo'} size={30} color='#0083c2' />,
      title: 'OOB Settings',
    },
    {
      icon: <UserAccount name={'account-reactivate-outline'} size={30} color='#0083c2' />,
      title: 'View Puk',
      onPress: () => navigation.navigate('ViewPuk')
    },
    {
      icon: <DeviceSetup name={'wrench'} size={30} color='#0083c2' />,
      title: 'VAS',
      onPress: () => navigation.navigate('ViewVas')
    },
    {
      icon: <Support name={'hand-coin'} size={30} color='#0083c2' />,
      title: 'International Roaming',
      onPress: () => navigation.navigate('InternationalRoaming')
    },
    {
      icon: <Support name={'hand-coin'} size={30} color='#0083c2' />,
      title: 'Content Services',
      onPress: () => navigation.navigate('ContentServices')

    },
  ]
  accountRenderCards = () => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <Text style={{ fontSize: 16, color: colors[0], marginVertical: 15, marginHorizontal: 10, fontFamily: fonts.primaryBold, }}>Manage Account</Text>
        <CardRender data={accountData || []} />
      </View>
    )
  }

  serviceRenderCards = () => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <Text style={{ fontSize: 16, color: colors[0], marginVertical: 15, marginHorizontal: 10, fontFamily: fonts.primaryBold, }}>Manage Services</Text>
        <CardRender data={servicesData || []} />
      </View>
    )
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HeaderSection/>
      <Text style={styles.headerText}>My Account</Text>
      {accountRenderCards()}
      {serviceRenderCards()}
    </ScrollView>
  )
}

export default MyAccount

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
    marginHorizontal: 20,
    marginVertical: 10
  }
})