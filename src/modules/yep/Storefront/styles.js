import Dimensions from '../Dimensions';
import Metrics from '../Metrics';
import { colors } from '../../../styles';
import { Platform, StyleSheet, Dimensions as dimens } from 'react-native';
import styled from 'styled-components/native';
const { height: SCREEN_HEIGHT, width } = dimens.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 84) : 112;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export const CustomText = styled.Text`
  font-family: ${props => props.fontFamily || "Gordita-Regular"};
  font-size: ${props => props.fontSize || "14px"};
  line-height: ${props => props.lineHeight || "14px"};
  letter-spacing: ${props => props.letterSpacing || "0px"};
  color: ${props => props.color || "#01272F"};
  ${props => props.style}
`;

export const StoreLogoWrapper = styled.View`
  height: ${width * 0.2}px;"
  width: ${width * 0.2}px;
  background: #fff;
  border: 2px solid #f1f1f1;
  box-shadow: 0px 3px 10px rgba(39, 40, 73, 0.08);
  border-radius: 20px;
`
export const StoreTopViewWrapper = styled.View`
  position: relative;
  width: 100%;
  background-color: #F7F8FB;
  height: ${Dimensions.pHeight(45)}px;
  ${props => props.style}
`
export const StoreTopViewContainer = styled.View`
  position: absolute;
  bottom: 10px;
  right: 20px;
  left: 20px;
  justify-content: flex-end;
  ${props => props.style}
`
export const StoreGalleryContainer = styled.ImageBackground`
  width: 100%;
  height: ${Dimensions.pHeight(24)}px;
  box-shadow: 0px 3px 20px rgba(39, 40, 73, 0.06);
  border-radius: 22.3602px;
`
export const StoreServiceCardContainer = styled.View`
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 3px 20px rgba(39, 40, 73, 0.06);
  border-radius: 20px;
`
export const ClaimStorefrontContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
  margin-top: 20px;
  background: #F0F3F7;
  border-radius: 20px;
  ${props => props.style};
`;

export const ClaimStorefrontLabel = styled.Text`
  font-family: Gordita-Medium;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.2px;
  color: #01272F;
  flex-grow: 0;
  margin: 5px 10px;
  ${props => props.style};
`;

export const ClaimStorefrontSubLabel = styled.Text`
  font-family: Gordita-Bold;
  font-size: 14px;
  line-height: 14px;
  align-items: center;
  text-align: right;
  color: #00C1BC;
  flex-grow: 0;
  margin: 5px 10px;
  ${props => props.style};
`;

export default StyleSheet.create({
  modalContainer: {
    width: width,
    margin: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  topViewWrapper:{
    position: 'relative',
    width: '100%',
    backgroundColor: '#F7F8FB',
    height: Dimensions.pHeight(45)
  },
  button: {
    backgroundColor: colors.yepDark,
    width: '100%',
    ...Platform.select({
      ios: { position: 'absolute', bottom: -25 },
      android: {},
    }),
  },
  claimButton: {
    backgroundColor: colors.white,
    borderColor: colors.yepDark,
    borderWidth: 2,
  },
  ccs: {
    paddingBottom: Dimensions.pHeight(8),
    padding: 20,
    backgroundColor: '#ffffff',
  },
  cardWrapper: {
    paddingBottom: Metrics.materialUnits(2.5),
    // paddingLeft: Metrics.materialUnits(2),
    // paddingRight: Metrics.materialUnits(2),
    // ...Platform.select({
    //   ios: { paddingVertical: Metrics.materialUnits(2) },
    //   android: { paddingVertical: Metrics.materialUnits(2), paddingRight: Metrics.materialUnits(2) },
    // }),
  },
  viewAboutUs: {
    padding: Metrics.medium,
    backgroundColor: colors.transparentGrey,
  },
  claimContainer: {
    marginTop: Metrics.materialUnits(3),
    paddingVertical: Metrics.materialUnits(3),
    borderTopColor: '#99A9AC',
    borderTopWidth: 1,
  },
  textHeading: {
    marginBottom: Metrics.materialUnits(3),
  },
  textHomePage: {
    marginTop: Metrics.materialUnits(3),
  },
  viewQuotes: {
    marginVertical: Metrics.normal,
    position: 'relative',
    height: 200,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textQuote: {
    textAlign: 'center',
    marginBottom: Metrics.normal,
  },
  textQuoteAuthor: {
    color: colors.white,
    textAlign: 'center',
  },
  textServices: {
    margin: Metrics.materialUnits(3),
  },
  emptyList: {
    paddingHorizontal: Metrics.materialUnits(3),
    paddingBottom: Metrics.materialUnits(3),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    // height: HEADER_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
  sloganText: {
    fontFamily: 'Gordita-Medium',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.32,
    color: '#01272F',
    textAlign: 'left',
    marginTop: 25,
    paddingTop: 0,
    paddingLeft: 0,
  },
  yepLogo: {
    width: width * 0.2,
    height: width * 0.08,
    resizeMode: 'contain',
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
    height: Dimensions.pHeight(37),
    backgroundColor: '#00C1BC',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  arrowBackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBack: {
    width:width * 0.2,
    height:width * 0.1,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  logoContainer: {
    width:width * 0.2,
    height:width * 0.2,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems:'center',
    justifyContent: 'center',
    zIndex: 1,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: width * 0.18,
    height: width * 0.18,
    // flex: 1,
    borderRadius: 20,
    resizeMode: 'contain',
    zIndex: 2,
    overflow: 'hidden',
    // alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
  certifiedContainer: {
    top: -20,
    right: -25,
    position: 'absolute',
    zIndex: 9,
    width: width * 0.065,
    height: width * 0.065,
    overflow: 'hidden',
    marginRight: 18,
    marginTop: 13,
  },
  certifiedIcon: {
    width: width * 0.065,
    height: width * 0.065,
    resizeMode: 'contain',
  },
  locationImage: {
    marginLeft: -5,
    resizeMode: 'center',
    tintColor: '#345259',
    opacity: 0.7,
  },
  flexRow: {
    flexDirection: 'row',
  },
  addressText: {
    color: '#345259',
    fontFamily: 'Gordita-Medium',
    fontSize: 14,
    letterSpacing: -0.32,
    lineHeight: 20,
    opacity: 0.7,
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
    }),
  },
  ratingImage: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'center',
  },
  ratingText: {
    color: '#01272F',
    fontFamily: 'Gordita-Bold',
    fontSize: 14,
    letterSpacing: -0.32,
    lineHeight: 20,
    marginRight: 5,
  },
  reviewsCount: {
    color: '#00C1BC',
    fontFamily: 'Gordita-Medium',
    fontSize: 14,
    letterSpacing: -0.32,
    lineHeight: 20,
  },
  dotText: {
    color: '#99A9AC',
    fontFamily: 'Gordita-Regular',
    // fontWeight: '500',
    fontSize: 15,
    marginLeft: 10,
  },
  favouriteImage: {
    width: 25,
    height: 25,
    marginRight: 8.5,
    resizeMode: 'contain',
  },
  serviceHeaderText: {
    fontFamily: 'Gordita-Bold',
    fontSize: 21,
    lineHeight: 28,
    letterSpacing: -1,
    color: '#01272F',
    textAlign: 'left',
    // fontWeight: 'bold',
    marginTop: 20,
  },
  serviceCardContainer: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#FFF',
    padding: 10,
    marginLeft: -15,
    marginRight: -15,
    paddingBottom: -15,
    padding: 0,
  },
  serviceImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 20,
    overflow: 'hidden',
  },
  serviceName: {
    fontFamily: 'Gordita-Bold',
    fontSize: 12,
    color: '#01272F',
    lineHeight: 14.4,
    letterSpacing: -0.32,
    padding: 5,
  },
  serviceDescription: {
    fontFamily: 'Gordita-Regular',
    color: '#01272F',
    fontSize: 9,
    lineHeight: 14,
    letterSpacing: 0.171429,
    padding: 5,
  },
  serviceFee: {
    fontFamily: 'Gordita-Bold',
    fontSize: 12,
    color: '#00C1BC',
    lineHeight: 18,
    letterSpacing: -0.32,
    padding: 5,
    textAlign: 'left',
  },
  getAQuote: {
    fontFamily: 'Gordita-Bold',
    fontSize: 12,
    color: '#01272F',
    lineHeight: 18,
    letterSpacing: -0.32,
    padding: 5,
    textAlign: 'left',
  },
  locationText: {
    fontFamily: 'Gordita-Bold',
    fontSize: 21,
    lineHeight: 28,
    letterSpacing: -1,
    color: '#01272F',
    textAlign: 'left',
  },
  directionsText: {
    fontFamily: 'Gordita-Bold',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.32,
    color: '#00C1BC',
    textAlign: 'right',
  },
  storeAddressText: {
    fontFamily: 'Gordita-Bold',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.2,
    color: '#01272F',
    textAlign: 'left',
    paddingTop: 20,
    paddingBottom: 20,
  },
  mapContainer: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 20,
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
  map: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  isStoreOpenText: {
    fontFamily: 'Gordita-Bold',
    fontSize: 16,
    letterSpacing: -0.32,
    lineHeight: 24,
    color: '#00C1BC',
  },
  arrowDown: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: '#00C1BC',
    width: width * 0.04,
    height: width * 0.04,
  },
  weekLabelText: {
    fontFamily: 'Gordita-Medium',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.32,
    color: '#01272F',
    paddingTop: 5,
    paddingBottom: 5,
  },

  lightTitle: {
    color: '#01272F',
    fontFamily: 'Gordita-Bold',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.32,
    padding: 10,
  },
  lightButton: {
    backgroundColor: '#FFF',
    borderColor: '#01272F',
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
  },
  darkButton: {
    backgroundColor: '#01272F',
    borderColor: '#01272F',
    borderRadius: 15,
    // marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
  },
  linksText: {
    fontFamily: 'Gordita-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#01272F',
    paddingTop: 5,
  },
  webLinkImage: {
    width: Dimensions.pWidth(6.2),
    height: Dimensions.pWidth(6.2),
    resizeMode: 'contain',
  },
  verifiedText: {
    fontFamily: 'Gordita-Medium',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: -0.2,
    color: '#345259',
    opacity: 0.7,
    textAlign: 'center',
    paddingRight: 10,
  },
  tooltipText: {
    fontFamily: 'Gordita-Medium',
    fontSize: 10,
    lineHeight: 14,
    color: '#FFFFFF',
  },
  separator: {
    height: 3,
    width: 3,
    borderRadius: 2,
    backgroundColor: '#99A9AC',
    marginHorizontal: 10
  },
  badge:{
    paddingHorizontal:Dimensions.pWidth(3.5),
    paddingVertical:Dimensions.pWidth(1.8),
    backgroundColor:'#FFCF00',
    borderRadius:22,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  badgeIcon:{
    width:Dimensions.pWidth(4.5),
    height:Dimensions.pWidth(4.5),
    marginBottom:5
  },
  badgeIconFromUrl:{
    width:Dimensions.pWidth(3.4),
    height:Dimensions.pWidth(3),
  },
  badgeText:{
    color:'#01272F',
    fontFamily:'Gordita-Medium',
    fontSize:12,
    lineHeight:17,
    marginLeft:7
  },
});
