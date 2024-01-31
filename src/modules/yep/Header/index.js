import React, { Component } from 'react';
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
  RefreshControl
} from 'react-native';
import OpenStore from '../Components/OpenStore';
import PopularKeywords from '../Components/PopularKeywords';
import WeaklyDeals from '../Components/WeaklyDeals';
import BrowseCategory from '../Containers/BrowseCategory';
import Deals from '../Containers/Deals';
import FeaturedBusiness from '../Containers/FeaturedBusiness';
import CustomButton from '../CustomButton';
import { GetWhatInputWrapper, GetWhatInputContainer, GetWhatInput, } from './styles';
import YepInfo from '../Containers/YepInfo';
// import { CampaignCard } from '../Campaign';
// import Testimonial from '../../Containers/Testimonial';
import FindYourStore from '../Components/FindYourStore';

import { Platform } from 'react-native';

const { height: SCREEN_HEIGHT, width } = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 84) : 112;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const renderNavBar = ({navigation,showYellowPageHeader=false}) => (
  <View style={[styles.navBar,!showYellowPageHeader && {height:80,paddingTop:30}]}>
    <TouchableOpacity
      activeOpacity={1}
      style={styles.iconLeft}
      onPress={() => { }}>
      <Image source={require('../Images/yep_logo.png')} style={styles.yepLogoMain} />
    </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={1}
      style={{ padding: 20, paddingRight: 30,width:60 }}
      onPress={() => {
        // StatusBar.setBackgroundColor('#F7F8FB');
        // StatusBar.setBarStyle('dark-content');
        // navigation.openDrawer();
      }}>
      <Image source={require('../Images/hamburger_menu.png')} style={{ height: 12, width: 20, resizeMode: 'contain', marginLeft: 15}} />
    </TouchableOpacity>
  </View>
)

const renderContent = ({ navigation, popularKeywords, showYellowPageHeader, homeData }) => {

  const handleFindYourStore = () =>{
    navigation.navigate('GetWhat');
  }

  return (
    <>
      <Title
        navigation={navigation}
        showYellowPageHeader={showYellowPageHeader}
        data={homeData?.hero_section}
      />
      <View style={{ backgroundColor: "#F7F8FB" }}>
        {(homeData?.hero_section?.categories || []).length ? <BrowseCategory title={homeData?.hero_section?.categories_title || ""} categories={homeData?.hero_section?.categories || []} navigation={navigation}/>:null}
        {homeData?.deals_section ? <Deals data={homeData?.deals_section || {}} navigation={navigation}/>:null}
        {(homeData?.bizInfo_section?.tabs ||  []).length ? <YepInfo navigation={navigation} tabs={homeData?.bizInfo_section?.tabs ||  []} title={homeData?.bizInfo_section?.title || ""}/>:null}
        {homeData?.yellowPages_section ? <FindYourStore callback={handleFindYourStore} data={homeData?.yellowPages_section || {}} />:null}
        {/* {homeData?.digitalProductsYp_section ? <CampaignCard pageType="home" navigation={navigation} data={homeData?.digitalProductsYp_section || {}}/>:null} */}
        {homeData?.openMyStore_section ? <OpenStore navigation={navigation} data={homeData?.openMyStore_section || {}}/>:null}
        {/* {(homeData?.featuredBusiness || []).length ? <FeaturedBusiness navigation={navigation} list={homeData?.featuredBusiness || []}/>:null} */}
        {/* <WeaklyDeals/> */}
        {/* {(homeData?.testimonial_section || []).length? <Testimonial pageType="home" data={homeData?.testimonial_section || []}/>:null} */}
        {homeData?.popularKeyWords_section ?<PopularKeywords navigation={navigation} data={homeData?.popularKeyWords_section || {}}/>:null}
      </View>
    </>
  );
};

const Title = ({navigation, showYellowPageHeader, data}) => {
  return (
    <ImageBackground source={{uri:(data?.bg_pattern_url || []).length && data.bg_pattern_url[0] || ""}} style={styles.imageContainerStyle}>
      <View style={{width: '100%',paddingHorizontal: 20}}>
        <View style={{alignItems: 'center',justifyContent: 'center',width:'100%',marginBottom:20}}>
          {(data?.logo_image_url || []).length? <Image source={{uri:data.logo_image_url[0]}} style={styles.yepLogo} /> :null}
        </View>
        <Text style={styles.titleStyle}>
          Plumbers? Yep!
        </Text>
        <GetWhatInputWrapper
          underlayColor="#FFFFFF"
          onPress={() => {
            navigation.navigate('GetWhat');
          }}
        >
          <GetWhatInputContainer>
            <Image source={require("../Images/search-dark.png")} style={styles.searchImg} />
            <View pointerEvents='none' style={{flex:1}}>
              <GetWhatInput
                placeholder={'Doctors, plumbers, beauty salons...'}
                editable={false}
              />
            </View>
          </GetWhatInputContainer>
        </GetWhatInputWrapper>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow:1 }}>
        <View style={{flexGrow: 1, flexDirection: 'row', paddingLeft:20}}>
          {
            (data?.popular_keywords || []).map((keyword, index) => (
              <View key={index} style={{ marginTop: 20, marginRight: 20, marginBottom: 10, }}>
                <CustomButton
                  title={keyword}
                  bgColor={"transparent"}
                  borderColor={"#01272F"}
                  onPress={() => navigation.navigate('GetWhat', { prefillKeyword: keyword })}
                />
              </View>
            ))
          }
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

class Header extends Component {

  componentDidMount() {
    this.props.getPopularKeywords();
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={this.props?.showYellowPageHeader?'#FFCF00':'#00C1BC'} />
        {renderNavBar(this.props)}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{flex:1}}
          refreshControl={<RefreshControl refreshing={this.props.loading}  onRefresh={this.props.handleRefresh} />}>
          {renderContent(this.props)}
        </ScrollView>
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
    height: NAV_BAR_HEIGHT,
    padding: 20,
  },
  navBar: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:20,
    backgroundColor:'#00C1BC',
    width:width,
    height:70
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  titleStyle: {
    fontFamily: 'Gordita-Bold',
    fontSize: 20,
    lineHeight: 27,
    letterSpacing: -0.5,
    color: '#01272F',
    textAlign: 'left',
  },
  yepLogo: {
    width: width * 0.25,
    height: width * 0.05,
  },
  iconLeft:{
    width: width * 0.22,
    height: width * 0.08,
  },
  yepLogoMain: {
    width: width * 0.22,
    height: width * 0.08,
  },
  searchImg: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginRight: 5,
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
  imageContainerStyle: {
    width: '100%',
    paddingVertical: 20,
    paddingTop:0,
    justifyContent: "space-between",
    backgroundColor: '#00C1BC',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }
});

export default Header;