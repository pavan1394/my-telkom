import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Text } from '../../components/StyledText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PrimaryButton from '../../components/PrimaryButton';
import {
  getPersonalDetails,
} from '../home/home';
import { PageLoader } from '../../components';
import { fonts } from '../../styles';

const { width } = Dimensions.get('window');

const accountDetails = [
  {
    key: 'PersonalDetails',
    type: 'Personal Details',
  },
  {
    key: 'BillingAddress',
    type: 'Billing Address',
  },
  {
    key: 'PhysicalAddress',
    type: 'Physical Address',
  },
  {
    key: 'ContactDetails',
    type: 'Contact Details',
  },
];

const personalDetailsKeys = [
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'givenName',
    label: 'Name',
  },
  {
    key: 'lastName',
    label: 'Surname',
  },
  {
    key: 'documentNumber',
    label: 'ID Number',
  },
];

const billingDetailsKeys = [
  {
    key: 'address',
    label: 'Address',
  },
  {
    key: 'town',
    label: 'Suburb',
  },
  {
    key: 'city',
    label: 'City',
  },
  {
    key: 'postalCode',
    label: 'Code',
  },
];

const contactDetailsKeys = [
  {
    key: 'phoneNumber',
    label: 'Phone No',
  },
  {
    key: 'mobileNumber',
    label: 'Mobile No',
  },
  {
    key: 'email',
    label: 'Email',
  },
];

class MyAccount extends Component {

  state = {
    activeIndex: 0,
    selectedType: {

    }
  };

  componentDidMount() {
    this.props.getPersonalDetails();
  }

  render() {
    const {
      navigation,
      loading,
      personalDetails,
      billingAddress,
      physicalAddress,
      contactDetails,
    } = this.props;
    console.log('check--------', physicalAddress, contactDetails, this.state.selectedType);
    return (
      <>
        <PageLoader loading={loading} />
        <ScrollView>
          <SafeAreaView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40, }}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {

                }}
              />
            }>
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ lineHeight: 20, color: '#000', fontFamily: fonts.primaryRegular, }}>{'We have the following details on record for this account'}</Text>
            </View>
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={accountDetails}
                keyExtractor={(item, i) => i}
                ItemSeparatorComponent={() => <View style={{ margin: 2 }} />}
                renderItem={({ item, i }) => {
                  return (
                    <View key={item.key}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          this.setState({
                            selectedType: {
                              ...this.state.selectedType,
                              [item.key]: !this.state.selectedType[item.key]
                            }
                          })
                        }}
                        style={styles.listCard}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ fontSize: 16, color: '#0083c2', fontFamily: fonts.primaryBold, }}>{item.type}</Text>
                        </View>
                        <MaterialIcons
                          name={!this.state.selectedType[item.key] ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                          size={30}
                          color='#0083c2'
                        />
                      </TouchableOpacity>
                      {this.state.selectedType[item.key] ?
                        item.key == 'PersonalDetails' ?
                          personalDetailsKeys.map(obj => {
                            return (
                              <View style={[styles.listCard, {
                                flexDirection: 'row',
                                marginTop: -12,
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 0,
                                borderRadius: 0,
                                borderBottomLeftRadius: 5,
                                borderBottomRightRadius: 5,
                              }]}>
                                <Text style={{ fontFamily: fonts.primaryMedium, color: '#000', }}>{`${obj.label}: `}</Text>
                                <View style={{ flex: 1 }} />
                                <Text style={{ fontFamily: fonts.primaryBold, color: '#000', }}>{`${personalDetails[obj.key] || ''}`}</Text>
                              </View>
                            )
                          })
                          :
                          (item.key == 'BillingAddress' || item.key == 'PhysicalAddress') ?
                            billingDetailsKeys.map(obj => {
                              return (
                                <View style={[styles.listCard, {
                                  flexDirection: 'row',
                                  marginTop: -12,
                                  marginLeft: 10,
                                  marginRight: 10,
                                  marginBottom: 0,
                                  borderRadius: 0,
                                  borderBottomLeftRadius: 5,
                                  borderBottomRightRadius: 5,
                                }]}>
                                  <Text style={{ fontFamily: fonts.primaryMedium, color: '#000', }}>{`${obj.label}: `}</Text>
                                  <View style={{ flex: 1 }} />
                                  <Text style={{ fontFamily: fonts.primaryBold, color: '#000', }}>{obj.key == 'address' ? `${billingAddress?.streetNumber || ''} ${billingAddress?.streetName || ''}` : `${billingAddress[obj.key] || ''}`}</Text>
                                </View>
                              )
                            })
                            :
                            contactDetailsKeys.map(obj => {
                              return (
                                <View style={[styles.listCard, {
                                  flexDirection: 'row',
                                  marginTop: -12,
                                  marginLeft: 10,
                                  marginRight: 10,
                                  marginBottom: 0,
                                  borderRadius: 0,
                                  borderBottomLeftRadius: 5,
                                  borderBottomRightRadius: 5,
                                }]}>
                                  <Text style={{ fontFamily: fonts.primaryMedium, color: '#000', }}>{`${obj.label}: `}</Text>
                                  <View style={{ flex: 1 }} />
                                  <Text style={{ fontFamily: fonts.primaryBold, color: '#000' }}>{`${contactDetails[obj.key] || ''}`}</Text>
                                </View>
                              )
                            })
                        : null}
                    </View>
                  )
                }}
              />
            </View>
            <View style={styles.footerText}>
              <Text style={{ lineHeight: 20, color: '#000', fontFamily: fonts.primaryRegular, textAlign: 'right' }}> {'For account related queries such as updating\nyour personal details. Contact the call center\nMobile: '}
                <Text style={styles.footerSubText}>0800180</Text>
                {' or Fixed: '}
                <Text style={styles.footerSubText}>080010210</Text></Text>
            </View>
            {/* <TouchableOpacity style={styles.btn}>
          <Text style={{ textAlign: 'center', color: '#0083c2', fontWeight: 'bold' }}>Back</Text>
        </TouchableOpacity> */}
            <PrimaryButton
              title={'Back'}
              navigation={() => navigation.goBack()}
            />
          </SafeAreaView>
        </ScrollView>
      </>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    // margin: 10,
    padding: 10,
  },
  listCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    // elevation: 2,
  },
  footerText: {
    marginTop: 20,
    marginRight: 40,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 20
  },
  btn: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 20,
    margin: 20,
    borderColor: '#0083c2'
  },
  footerSubText: {
    color: '#0083c2',
    fontFamily: fonts.primaryRegular,
    textDecorationLine: 'underline'
  }
});

export default connect(
  state => {
    return {
      loading: state.home.loading,
      personalDetails: state.home.personalDetails,
      billingAddress: state.home.billingAddress,
      physicalAddress: state.home.physicalAddress,
      contactDetails: state.home.contactDetails,
    };
  }, {
  getPersonalDetails,
}
)(MyAccount);
