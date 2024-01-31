import { StyleSheet, Platform, } from 'react-native'
import Dimensions from './Dimensions'
import Metrics from './Metrics'
import styled from 'styled-components/native';

const { width, height } = Dimensions.window;

export const GetWhatInputWrapper = styled.TouchableHighlight`
  background: #FFFFFF;
  box-shadow: 0px 20px 60px rgba(39, 40, 73, 0.15);
  border-radius: 20px;
  elevation: 5;
  overflow: hidden;
  margin-top: 15px;
  padding-horizontal: 12px
`;

export const GetWhatInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${Dimensions.pWidth(15)}px;
`;

export const GetWhatInput = styled.TextInput.attrs({
  placeholderTextColor: "#99A9AC",
})`
  flex: 1;
  font-family: 'Gordita-Medium';
  font-size: 14px;
  line-height: 20px;
  color: #01272F;
`;

export const Title = styled.Text`
  font-family: "Gordita-Bold";
  font-size: 22px;
  line-height: 29px;
  letter-spacing: -1px;
  color: #01272F;
`

export const CategoryTitle = styled.Text`
  font-family: "Gordita-Bold";
  font-size: 32px;
  line-height: 42px;
  letter-spacing: -1px;
  color: #01272F;
  width: 80%;
  text-align: center;
`

export const Subtitle = styled.Text`
  font-family: "Gordita-Regular";
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: #01272F;
  textAlign: center;
  marginTop: 10px;
`

export const CategoryCardWrapper = styled.View`
  background: #FFFFFF;
  box-shadow: 0px 20px 60px rgba(39, 40, 73, 0.15);
  border-radius: 20px;
  height: ${Dimensions.pWidth(40)}px;
  width: ${Dimensions.pWidth(40)}px;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  elevation: 5;
  overflow: hidden;
`
export const CategoryCardWrapperWithOutBorder = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
export const IconContainer = styled.View`
  height: 50px;
  width: 50px;
  justify-content: center;
  align-items: center;
  background: #01272F;
  box-shadow: 0px 20.0383px 53.4354px rgba(39, 40, 73, 0.25);
  border-radius: 33.3971px;
`
export const Label = styled.Text`
  font-family: "Gordita-Medium";
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.02px;
  color: #01272F;
  margin-top:12px;
  line-height:18px;
`
export const DealsCardWrapper = styled.View`
  background: #000000;
  box-shadow: 0px 20px 60px rgba(39, 40, 73, 0.15);
  border-radius: 20px;
  height: ${Dimensions.pWidth(90)}px;
  width: ${Dimensions.pWidth(70)}px;
  elevation: 5;
  overflow: hidden;
`
export const DealsFooter = styled.View`
  widht:100%;
  padding:0 20px;
`
export const DealsFooterText = styled.Text`
  font-family: "Gordita-Regular";
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.2px;
  color: #01272F;
`
export const DealsFooterDivider = styled.View`
  widht:100%;
  height:1px;
  background-color:#809397;
  opacity:0.2;
  margin: 15px 0;
`
export const DealsFooterContactHeader = styled.Text`
  font-family: "Gordita-Medium";
  font-size: 12px;
  line-height: 27px;
  letter-spacing: -0.2px;
  color: #809397;
  margin-bottom: 5px;
`
export const DealsFooterContactText = styled.Text`
  font-family: "Gordita-Bold";
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.2px;
  color: #00C1BC;
`
export const DealsName = styled.Text`
  font-family: "Gordita-Medium";
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.2px;
  color: #FFFFFF;
  margin-bottom: 15px;
  text-decoration: underline;
  text-decoration-color: #FFFFFF;
`
export const DealsLocation = styled.Text`
  font-family: "Gordita-Regular";
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.171429px;
  color: #FFFFFF;
  margin-left: 10px;
`
export const DealsOffer = styled.Text`
  font-family: "Gordita-Bold";
  font-size: 18px;
  line-height: 22px;
  color: #FFFFFF;
`
export const DealsDescription = styled.Text`
  font-family: "Gordita-Regular";
  font-size: 12px;
  line-height: 15px;
  color: #FFFFFF;
`
export const FeaturedBusinessCardWrapper = styled.View`
  background: #FFFFFF;
  box-shadow: 0px 20px 80px rgba(39, 40, 73, 0.15);
  border-radius: 25px;
  elevation: 1;
`
export const FeaturedBusinessCardContainer = styled.View`
  min-height: ${Dimensions.pWidth(62)}px;
  width: ${Dimensions.pWidth(84)}px;
  overflow: hidden;
`
export const FeaturedBusinessName = styled.Text`
  font-family: ${({ type2 }) => type2 ? "Gordita-Bold" : "Gordita-Medium"};
  font-size: ${({ type2 }) => type2 ? "16px" : "14px"};
  line-height: 17px;
  letter-spacing: -0.32px;
  color: #01272F;
`
export const FeaturedBusinessLocation = styled.Text`
  font-family: "Gordita-Medium";
  font-size: ${({ type2 }) => type2 ? "12px" : "11px"};
  line-height: 15px;
  letter-spacing: -0.32px;
  color: #345259;
  opacity: 0.7;
  margin-left: 10px;
`
export const FeaturedBusinessTag = styled.Text`
  font-family: "Gordita-Regular";
  font-size: 10px;
  line-height: 14px;
  color: #01272F;
`
export const StaticBlockWrapper = styled.View`
  background: #FFFFFF;
  box-shadow: 0px 20px 80px rgba(39, 40, 73, 0.15);
  border-radius: 25px;
  elevation: 5;
  align-self: center;
  width: ${Dimensions.pWidth(90)}px;
  overflow: hidden;
  margin: 20px 0;
`
export const StaticBlockTitle = styled.Text`
  font-family: "Gordita-Bold";
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.3px;
  color: #01272F;
  margin-top: 20px;
`
export const StaticBlockSubTitle = styled.Text`
  font-family: "Gordita-Regular";
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.2px;
  color: #01272F;
  margin-top: 10px;
  text-align: center;
`
export const PopularKeywordsWrapper = styled.View`
  background: #FFCF00;
  border-radius: 25px;
  align-self: center;
  width: ${Dimensions.pWidth(90)}px;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
  padding: 30px 0px;
`
export const PopularKeywordsTitle = styled.Text`
  font-family: "Gordita-Bold";
  font-size: 20px;
  line-height: 27px;
  letter-spacing: -1px;
  color: #01272F;
  text-align: center;
  width: 100%;
  padding: 0 20px;
`

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFCF00',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.pWidth(32),
    height: Dimensions.pWidth(2.4),
    marginBottom: 5
  },
  infoText: {
    color: '#01272F',
    fontSize: 9,
    fontFamily: 'Gordita-Medium'
  },
  closeIcon: {
    width: Dimensions.pWidth(3.2),
    height: Dimensions.pWidth(3.2),
  },
  listContainer: {
    flex: 1,
    left: Metrics.materialUnits(3) * -1, //to compensate for parent padding
    width: Dimensions.window.width,
    paddingTop: Metrics.materialUnits(2),
  },
  verticalTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    // marginTop: 30,
    marginBottom: 10,
  },
  endPadding: {
    // borderColor: 'blue',
    // borderRadius: 1,
    // borderWidth: 1,
    width: Metrics.materialUnits(3),
    height: '100%',
    backgroundColor: 'transparent',
  },
  cardWrapper: {
    marginRight:20,
    marginTop:20,
    padding: 5,
  },
  contentContainer: {
    paddingLeft: Metrics.materialUnits(3),
  },
  emptyList: {
    width: Dimensions.pWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    textAlign: 'left',
    width: '100%',
  },
  dealsImageBg: {
    flex: 1,
    padding: 20,
    resizeMode: "cover",
    justifyContent: "space-between",
    alignItems: 'flex-start',
  },
  dealsLocationContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
  },
  dealsLogo: {
    width: Dimensions.pWidth(15),
    height: Dimensions.pWidth(15),
    borderRadius: 100,
    resizeMode: "cover",
    overflow: "hidden",
  },
  dealsBodyContainer: {
    justifyContent: "space-between",
    alignItems: 'flex-start',
  },
  dealsLocationImage: {
    width: width*0.032,
    height: width*0.037,
  },
  featuredBusinessTopContainer: {
    flex: 0.65,
  },
  featuredBusinessImageBg: {
    flex: 1,
    padding: 20,
    resizeMode: "cover",
  },
  featuredBusinessHeaderWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  featuredBusinessLogo: {
    width: Dimensions.pWidth(14),
    height: Dimensions.pWidth(14),
    borderRadius: 100,
    resizeMode: "cover",
    overflow: "hidden",
  },
  featuredBusinessFavouriteButton: {
    height: Dimensions.pWidth(9.6),
    width: Dimensions.pWidth(9.6),
    borderRadius: Dimensions.pWidth(9.6),
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  featuredBusinessBottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  featuredBusinessLocationContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  featuredBusinessTagOuterContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: 'wrap',
  },
  featuredBusinessTagInnerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tagDot: {
    width: 3,
    height: 3,
    backgroundColor: "#01272F",
    marginHorizontal: 10,
  },
  staticBlockImageBg: {
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: 40,
    paddingBottom: 30,
    resizeMode: "cover",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  popularKeywordsBodyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: "center"
  },
  itemCardWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity:  Platform.OS === 'ios' ? 0.03 : 0.25,
    shadowRadius: 3.84,
  },
  premiumCardWrapper: {
    borderWidth:2,
    borderColor:'#FFCF00',
    borderRadius:22,
    overflow: 'hidden',
    position: 'relative'
  },
  premiumCardWrapper2: {
    borderWidth:2,
    borderColor:'#FFCF00',
    borderRadius:25,
    overflow: 'hidden',
    position: 'relative'
  },
  badge:{
    paddingHorizontal:15,
    paddingVertical:12,
    backgroundColor:'#FFCF00',
    position: 'absolute',
    top:0,
    right:0,
    borderBottomLeftRadius:20,
    borderTopRightRadius:20,
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
  textPadding: {
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
    }),
  },
  certifiedContainer: {
    right: 0,
    top: 0,
    position: 'absolute',
    zIndex: 9,
    width: width * 0.05,
    height: width * 0.05,
    overflow: 'hidden',
  },
  certifiedIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  featuredBusinessReview:{
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center',
    width:34,
    height:34,
    borderRadius:34,
    backgroundColor:'#01272F'
  },
  reviewText:{
    color:'#fff',
    fontFamily:'Gordita-Bold',
    fontSize:11,
    lineHeight:15,
  }
})