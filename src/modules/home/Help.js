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
  FlatList
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Text } from '../../components/StyledText';
import MobileIcon from 'react-native-vector-icons/AntDesign';
import UserAccount from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceSetup from 'react-native-vector-icons/SimpleLineIcons';
import Support from 'react-native-vector-icons/MaterialCommunityIcons';
import ForwardIcon from 'react-native-vector-icons/MaterialIcons';
import RadioAntenna from 'react-native-vector-icons/MaterialCommunityIcons';
import HeadSet from 'react-native-vector-icons/MaterialCommunityIcons';
import CircleCross from 'react-native-vector-icons/Feather'
import CommonHeader from '../navigation/CommonHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fonts } from '../../styles';


const { width } = Dimensions.get('window');

const options = [
  {
    icon: <Image source={require("../../images/mobile.png")} style={{ width: 40, height: 40 }} />,
    title: 'Mobile',
    journey: '',
  },
  {
    icon: <MobileIcon name={'questioncircleo'} size={30} color='#0083c2' />,
    title: 'Top 10 FAQ',
    journey: 'Top 10 FAQ',
  },
  {
    icon: <UserAccount name={'account-reactivate-outline'} size={30} color='#0083c2' />,
    title: 'Account',
    journey: 'Account',
  },
  {
    icon: <DeviceSetup name={'wrench'} size={30} color='#0083c2' />,
    title: 'Device Setup',
    journey: 'Device Setup',
  },
  {
    icon: <Support name={'hand-coin'} size={30} color='#0083c2' />,
    title: 'Support And Downloads',
    journey: 'Support and downloads',
  },
  {
    icon: <Image source={require("../../images/cross.png")} style={{ width: 40, height: 40 }} />,
    title: 'Log a fault',
    journey: 'Log a Fault',
  },
  {
    icon: <Image source={require("../../images/store.png")} style={{ width: 40, height: 40 }} />,
    title: 'Find a store',
    journey: 'Find a store',
  },
  {
    icon: <RadioAntenna name={'antenna'} size={30} color='#0083c2' />,
    title: 'Check coverage',
    journey: '',
  },
  {
    icon: <HeadSet name={'headset'} size={30} color='#0083c2' />,
    title: 'Chat to an agent',
    journey: '',
  },
  {
    icon: <Image source={require("../../images/fraud.png")} style={{ width: 40, height: 40 }} />,
    title: 'Report fraud',
    journey: '',
  },
  {
    icon: <CircleCross name={'x-circle'} size={30} color='#0083c2' />,
    title: 'Cancel your service',
    journey: 'Cancellations',
  },
]

class Help extends Component {

  state = {
    activeIndex: 0,
  };

  render() {
    const { navigation, banners, loading, } = this.props;
    return (
      <View style={{ flex: 1, }}>
        <CommonHeader leftText={'Get Help'} rightIcon={<AntDesign name='setting' size={30} color='#fff'/>} />
        <View
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 40, }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {

              }}
            />
          }>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.helpText}>How can we help?</Text>
            <Text style={{ marginBottom: 20, color: '#000', }}>Select an option below</Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={options}
            keyExtractor={(item, i) => i}
            ItemSeparatorComponent={() => <View style={{ margin: 2 }} />}
            renderItem={({ item, i }) => {
              return (
                <TouchableOpacity
                  style={styles.listCard}
                  onPress={() => {
                    if (item.journey) {
                      navigation.navigate('GetHelpDetailsPage', {
                        journey: item.journey,
                      });
                    }
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 12, }}>{item.icon}</View>
                    <Text style={{ fontSize: 16, color: '#0083c2', marginTop: 5, fontFamily: fonts.primaryBold, }}>{item.title}</Text>
                  </View>
                  <ForwardIcon name="keyboard-arrow-right" size={30} color='#0083c2' />
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: 10,
    padding: 10,
  },
  helpText: {
    color: '#0083c2',
    fontSize: 18,
    fontFamily: fonts.primaryBold,
    // marginLeft: 20
  },
  listCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  }
});

export default connect(
  state => {
    return {
      banners: state.home.banners,
      loading: state.home.loading,
      selectedLocation: state.home.selectedLocation,
    };
  }, {
}
)(Help);
