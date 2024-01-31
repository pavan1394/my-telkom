import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

const { height: SCREEN_HEIGHT, width } = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 84) : 112;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const renderNavBar = (navigation) => (
  <View style={styles.navContainer}>
    <View style={styles.statusBar} />
    <View style={styles.navBar}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.iconLeft}
        onPress={() => { }}>
        <Image source={require('../../Common/Images/yep_logo.png')} style={styles.yepLogo} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={{ padding: 20, paddingRight: 5, }}
        onPress={() => {
          // navigation.toggleDrawer();
          StatusBar.setBackgroundColor('#F7F8FB');
          navigation.openDrawer();
        }}>
        <Image source={require('../../Common/Images/hamburger_menu.png')} style={{ height: 12, width: 20, resizeMode: 'center', }} />
      </TouchableOpacity>
    </View>
  </View>
);

const renderContent = ({ navigation, popularKeywords }) => {
  return (
    <>
      <Title
        navigation={navigation}
      />
    </>
  );
};

const Title = (props) => {
  const { navigation, popularKeywords } = props;
  return (
    <ImageBackground source={require('../../Common/Images/header_background.png')} style={styles.imageContainerStyle}>
      <Text style={styles.titleStyle}>
        Plumbers? Yep!
      </Text>
    </ImageBackground>
  );
};

class Header extends Component {

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'#00C1BC'} />
        <ReactNativeParallaxHeader
          headerMinHeight={100}
          headerMaxHeight={100}
          extraScrollHeight={20}
          navbarColor="#00C1BC"
          titleStyle={styles.titleStyle}
          backgroundImage={require('../../Common/Images/header_background.png')}
          backgroundColor={'#00C1BC'}
          renderNavBar={() => renderNavBar(this.props.navigation)}
          renderContent={() => renderContent(this.props)}
          containerStyle={styles.containerStyle}
          contentContainerStyle={styles.contentContainer}
          innerContainerStyle={styles.container}
          scrollViewProps={{
            onScrollBeginDrag: () => { },
            onScrollEndDrag: () => { },
          }}
          alwaysShowNavBar={true}
        />
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    padding: 20,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    flex: 1,
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    fontFamily: 'Gordit-Bold',
    fontSize: 20,
    lineHeight: 27,
    letterSpacing: -0.5,
    color: '#01272F',
    textAlign: 'left',
  },
  yepLogo: {
    width: '100%',
    height: '100%',
  },
  iconLeft: {
    width: width * 0.2,
    height: width * 0.08,
  },
  searchImg: {
    marginRight: 10,
    height: 12,
    width: 10,
  },
  imageContainerStyle: {
    width: '100%',
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: '#00C1BC',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }
});

export default Header;