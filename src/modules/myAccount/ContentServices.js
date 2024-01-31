import React, { useEffect } from "react";
import { connect } from 'react-redux';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import HeaderSection from "../../components/HeaderSection";
import PrimaryButton from "../../components/PrimaryButton";
import Circle from '../../images/tick.png';
import DownArrow from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fonts } from "../../styles";
import {
  getContentServicesData,
} from '../home/home';
import { PageLoader } from "../../components";

const labels = ['Service', 'Status', 'Action']

const ContentServices = ({
  navigation,
  loading,
  selectedServiceId,
  contentServiceData,
  getContentServicesData,
}) => {

  useEffect(() => {
    getContentServicesData();
  }, [selectedServiceId]);
  return (
    <SafeAreaView style={styles.container}>
      <PageLoader loading={loading} />
      <ScrollView
        refreshControl={
          <RefreshControl
            // refreshing={loading}
            onRefresh={getContentServicesData}
          />
        }>
        <HeaderSection />
        <View style={styles.contentContainer}>
          <View style={styles.serviceContainer}>
            <Text style={styles.headerText}>Your content services</Text>
            <Text style={{ fontFamily: fonts.primaryRegular, color: '#000', }}>Tap on your content service to view more</Text>
            <View style={styles.label}>
              {contentServiceData.length ? labels.map((label, i) => {
                return (
                  <Text key={i} style={styles.label}>{label}</Text>
                )
              }) : null}
            </View>
          </View>
          <View>
            {contentServiceData.map((service, i) => {
              return (
                <View style={styles.serviceCard} key={i}>
                  <Text style={{ paddingVertical: 10, fontFamily: fonts.primaryRegular, color: '#000', }}>{service.contentDescription}</Text>
                  <View style={{ borderLeftWidth: 1, borderColor: '#d8d8d8' }}></View>
                  <View style={{ alignItems: 'center' }}>
                   <AntDesign name={service.status == 'Cancelled' ? 'closecircleo' : 'checkcircle'} size={14} color={service.status == 'Cancelled' ? '#ff0000' : '#008000 '} />
                    <Text style={{ fontFamily: fonts.primaryRegular, color: '#000' }}>{service.status}</Text>
                  </View>
                  <View style={{ borderLeftWidth: 1, borderColor: '#d8d8d8' }}></View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btn}>
                      <Text style={{ color: '#0083c2', fontFamily: fonts.primaryMedium, }}>Cancel</Text>
                    </TouchableOpacity>
                    <DownArrow name='keyboard-arrow-down' size={20} color='#0083c2' style={{ marginLeft: 10 }} />
                  </View>
                </View>
              )
            })}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  serviceContainer: {
    marginHorizontal: 30,
  },
  headerText: {
    fontSize: 18,
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
    marginVertical: 15
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    elevation: 6,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 10
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14,
    fontWeight: '500',
    color: '#26292E',
    marginVertical: 10,
    fontFamily: fonts.primaryRegular,
  },
  btn: {
    borderRadius: 20,
    borderColor: '#0083c2',
    borderWidth: 1,
    padding: 8
  }
});

export default connect(
  state => {
    return {
      loading: state.home.loading,
      selectedServiceId: state.home.selectedServiceId,
      contentServiceData: state.home.contentServiceData || [],
    };
  }, {
  getContentServicesData,
}
)(ContentServices);