import React, { useEffect, useContext, useState } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Dimensions from './Dimensions';
import { View, Image, ScrollView, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
// import { Button } from '../../components/Button';
import { Button } from 'react-native-elements';
import moment from 'moment';
import { colors } from '../../styles';
import {
  setYPPopUpData,
} from '../auth/session';
import {
  getYepDashboardData,
  getPopularKeywords,
} from './yep';
import { PageLoader } from '../../components';

const HomeScreen = ({ navigation,
  getPopularKeywords,
  popularKeywords,
  showYellowPageHeader,
  session,
  setYPPopUpData,
  homeData,
  loading,
  getYepDashboardData,
}) => {
  const [animate, setAnimate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // getPopularKeywords();
    getYepDashboardData();
    hasOneDayPassed();
  }, []);

  const hasOneDayPassed = async () => {
    const value = session?.lastYPPopUp || null;
    if (value !== null) {
      const today = moment(new Date()).format("YYYY-MM-DD");
      let days = moment(today).diff(moment(value), 'days');
      if (days > 0) {
        setShowModal(true);
        setTimeout(() => {
          setAnimate(true);
          setTimeout(() => {
            setAnimate(false);
          }, 1200);
        }, 150);
      }
    } else {
      setShowModal(true);
      setTimeout(() => {
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 1200);
      }, 150);
    }
  }

  const closeYellowpagePopup = async () => {
    try {
      const currentTime = moment(Date.now()).format("YYYY-MM-DD");
      setYPPopUpData({ ...session, lastYPPopUp: currentTime });
      setShowModal(false);
    } catch (err) {
      // saving error
      console.log(err);
    }
  }

  const handleRefresh = () => {
    getYepDashboardData();
  }

  const DialogBox = () => {
    return (
      <View style={{ width: Dimensions.pWidth(92), padding: 20, paddingTop: 20, paddingBottom: 30, alignItems: 'center', backgroundColor: '#F7F8FA', borderRadius: 20, marginVertical: 30, elevation: 5, shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.25, shadowRadius: 5, marginLeft: Dimensions.pWidth(4) }}>
        <View style={{ width: '100%', alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={{ marginBottom: 20, padding: 10, transform: [{ translateX: 10 }], }}
            onPress={() => {
              closeYellowpagePopup();
            }}>
            <Image style={{ width: Dimensions.pWidth(4), height: Dimensions.pWidth(4), }} source={require('../../images/close.png')} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontFamily: 'Gordita-Bold', fontSize: 20, lineHeight: 27, letterSpacing: -1, color: colors.black, textAlign: 'center', }}>Welcome to the new home of Yellow Pages</Text>
        <View style={{ width: '100%', alignItems: 'center', marginVertical: 20, position: 'relative', height: Dimensions.pWidth(20), justifyContent: 'center' }}>
          {animate ? <Image source={require('../../images/confetti.gif')} style={{ width: Dimensions.pWidth(40), height: Dimensions.pWidth(40), position: 'absolute' }} /> : null}
          <Image source={require('../../images/ypYepLogo.png')} style={{ position: 'absolute', width: Dimensions.pWidth(48), height: Dimensions.pWidth(12), borderRadius: 0 }} />
        </View>
        <Text style={{ fontFamily: 'Gordita-Regular', fontSize: 14, lineHeight: 22, letterSpacing: -0.2, color: colors.black, textAlign: 'center', }}>
          Take a look around and experience all the awesome features and services offered by Yellow Pages, right here on Yep! Marketplace.
        </Text>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
          <Button
            containerStyle={{ flex: 0.49, marginTop: 10, borderRadius: 15 }}
            buttonStyle={{ backgroundColor: '#01272F', borderColor: '#01272F', borderRadius: 15, borderWidth: 1, paddingVertical: 14 }}
            titleStyle={{ color: '#fff', fontFamily: 'Gordita-Bold', lineHeight: 18, letterSpacing: -0.32, fontSize: 14 }}
            onPress={() => {
              closeYellowpagePopup();
              navigation.navigate('About');
            }}
            title="Learn more"
          />
          <Button
            containerStyle={{ flex: 0.49, marginTop: 10, marginLeft: 7, borderRadius: 15 }}
            buttonStyle={{ backgroundColor: '#fff', borderColor: '#01272F', borderRadius: 15, borderWidth: 1, paddingVertical: 14 }}
            titleStyle={{ color: colors.black, fontFamily: 'Gordita-Bold', lineHeight: 18, letterSpacing: -0.32, fontSize: 14 }}
            onPress={() => {
              closeYellowpagePopup();
            }}
            title="Continue"
          />
        </View>
      </View>
    );
  };

  return (
    <>
      {/* <PageLoader loading={loading} /> */}
      <Header
        navigation={navigation}
        popularKeywords={popularKeywords}
        getPopularKeywords={getPopularKeywords}
        showYellowPageHeader={showYellowPageHeader}
        homeData={homeData}
        loading={loading}
        handleRefresh={handleRefresh}
      />
      <Modal
        statusBarTranslucent={true}
        propagateSwipe={true}
        animationInTiming={350}
        backdropOpacity={0}
        useNativeDriver={true}
        deviceHeight={Dimensions.pHeight(100)}
        isVisible={showModal}
        style={{ width: Dimensions.pWidth(100), margin: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1 }}>
          <DialogBox />
        </View>
      </Modal>
    </>
  );
};

export default connect(
  state => {
    return {
      session: state.session,
      popularKeywords: state.yepHome.popularKeywords,
      showYellowPageHeader: state.yepHome.showYellowPageHeader,
      loading: state.yepHome.loading,
      homeData: state.yepHome.homeData,
    };
  }, {
  setYPPopUpData,
  getYepDashboardData,
  getPopularKeywords,
}
)(HomeScreen);
