import { StyleSheet, Platform } from "react-native";
import styled from "styled-components/native";
import Dimensions from "../Dimensions";

const { width } = Dimensions.window;

export const SearchText = styled.Text`
  font-family: "Gordita-Regular";
  font-size: 14px;
  align-items: center;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: #01272F;
  align-self: center;
  margin: 14px 0px;
`;

export const SearchTextBold = styled.Text`
  font-family: "Gordita-Bold";
  font-size: 14px;
  align-items: center;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: #01272F;
  align-self: center;
  margin: 14px 0px;
  ${props => props.style}
`;

export const Card = styled.TouchableOpacity`
  box-shadow: 0px 20px 60px rgba(39, 40, 73, 0.15);
  border-radius: 25px;
  overflow: hidden;
  padding: 20px;
`;

export const StoreTitle = styled.Text`
  font-family: Gordita-Bold;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.32px;
  text-align: left;
  ${props => props.style}
`;

export const StoreLocation = styled.Text`
  font-family: "Gordita-Regular";
  font-size: 12px;
  line-height: 17px;
  letter-spacing: -0.32px;
  text-align: left;
  color: #345259;
`;

export const StoreRatingText = styled.Text`
  font-family: "Gordita-Bold";
  font-size: 10px;
  line-height: 14px;
  letter-spacing: -0.32px;
  text-align: center;
  color: #FFFFFF;
`;

export const ClosedText = styled.Text`
  font-family: "Gordita-Regular";
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.02px;
  text-align: left;
`;

export const ViewDetailsText = styled.Text`
  font-family: "Gordita-Bold";
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: right;
  color: #01272F;
`;

export const BottomDrawerWrap = styled.View`
  flex-grow: 0;
  background-color: #FFFFFF;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export const BottomDrawerHeading = styled.Text`
  font-family: Gordita-Bold;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  letter-spacing: 0.2px;
  color: #01272F;
  margin-top: 16.6px;
  margin-bottom: 5.6px
`;

export const SubCategoryText = styled.Text`
  font-family: "Gordita-Medium";
  font-size: 12px;
  line-height: 17px;
  letter-spacing: -0.32px;
  color: ${props => props.selected ? '#fff' : '#01272F'}
`;

export const InfoCard = styled.View`
  background: #ffffff;
  box-shadow: 0px 30px 80px rgba(39, 40, 73, 0.25);
  border-radius: 20px;
  flex-direction: row;
  margin: 5px 0px 10px 0px;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  elevation: 12;
  ${props => props.style};
`;

const styles = StyleSheet.create({
  modalContainer: {
    width: width,
    margin: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  skipText: {
    fontFamily: "Gordita-Regular",
    fontSize: 16,
    alignItems: "center",
    letterSpacing: 1,
    color: "#01272F",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#F7F8FB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
  },
  noMarginTop: {
    marginTop: -20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal:5,
    marginVertical:10
  },
  input: {
    includeFontPadding:false,
    ...Platform.select({
      ios: {
        lineHeight: 16,
      },
    }),
  },
  textPadding: {
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
    }),
  },
  logoContainer: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
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
    marginLeft: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.185,
    height: width * 0.185,
    borderRadius: 20,
    resizeMode: 'contain',
    zIndex: 2,
    overflow: 'hidden',
    alignSelf: 'center',
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
    marginTop: 15,
    
  },
  certifiedIcon: {
    width: width * 0.065,
    height: width * 0.065,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
});

export default styles;