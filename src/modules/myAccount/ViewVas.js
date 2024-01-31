import React, { useEffect } from "react";
import { connect } from 'react-redux';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl
} from 'react-native';
import HeaderSection from "../../components/HeaderSection";
import Circle from '../../images/tick.png'
import PrimaryButton from "../../components/PrimaryButton";
import { colors, fonts } from "../../styles";
import {
  getVasData
} from '../home/home';
import { PageLoader } from "../../components";

const labels = ['Service', 'Activation', 'Status'];

// const vasData = [
//   {
//     title: 'Your active value added services',
//     data: [
//       {
//         serviceName: 'CLIP',
//         activationDate: '2021-12-08',
//         activationTime: '18:00:53',
//         status: 'Active'
//       },
//       {
//         serviceName: 'Temporary CLIR',
//         activationDate: '2021-12-08',
//         activationTime: '18:00:53',
//         status: 'Active'
//       },
//       {
//         serviceName: 'Voicemail',
//         activationDate: '2021-12-08',
//         activationTime: '18:00:53',
//         status: 'Active'
//       },
//       {
//         serviceName: 'Internet APN',
//         activationDate: '2021-12-08',
//         activationTime: '18:00:53',
//         status: 'Active'
//       },
//       {
//         serviceName: 'MMS APN',
//         activationDate: '2021-12-08',
//         activationTime: '18:00:53',
//         status: 'Active'
//       },
//     ]
//   }
// ]

const ViewVAS = ({
  navigation,
  loading,
  selectedServiceId,
  vasData,
  getVasData,
}) => {

  useEffect(() => {
    getVasData();
  }, [selectedServiceId]);

  return (
    <View style={{ flex: 1, }}>
      <PageLoader loading={loading} />
      <ScrollView
        refreshControl={
          <RefreshControl
            // refreshing={loading}
            onRefresh={getVasData}
          />
        }>

        <HeaderSection />
        <Text style={styles.header}>{`Your active value added services`}</Text>
        <View style={styles.label}>
          {vasData.length ? labels.map((label, i) => {
            return (
              <Text style={styles.labelText} key={i}>{label}</Text>
            )
          }) : null}
        </View>
        {vasData.map((service, i) => {
          const date = service.effectDate.split(' ');
          return (
            <View key={i} style={{ flex: 1 }}>
              <View style={styles.serviceCard} key={i}>
                <Text style={styles.serviceText}>{service.productName}</Text>
                <View style={styles.activation}>
                  <Text style={{ color: '#000', fontFamily: fonts.primaryRegular, }}>{date[0] || ''}</Text>
                  <Text style={{ color: '#000', fontFamily: fonts.primaryRegular, }}>{date[1] || ''}</Text>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <Image source={Circle} style={{ width: 25, height: 25, }} />
                  <Text style={styles.status}>{service.status}</Text>
                </View>

              </View>
            </View>
          )
        })}
      </ScrollView>
      <View style={{ justifyContent: 'flex-end' }}>
        <PrimaryButton title={'Back'} navigation={() => navigation.goBack()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 6,
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  header: {
    fontSize: 16,
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
    paddingVertical: 20,
    paddingHorizontal: 30
  },
  serviceText: {
    flex: 2,
    fontSize: 12,
    fontFamily: fonts.primaryMedium,
    color: colors.blue,
    paddingLeft: 10,
  },
  status: {
    color: colors.black,
    fontFamily: fonts.primaryMedium,
  },
  activation: {
    flex: 2,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.lightGray
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10
  },
  labelText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
  }
});

export default connect(
  state => {
    return {
      loading: state.home.loading,
      selectedServiceId: state.home.selectedServiceId,
      vasData: state.home.vasData || [],
    };
  }, {
  getVasData,
}
)(ViewVAS);

