import styled from 'styled-components/native';
import { StyleSheet, Platform } from 'react-native';

export const CustomButtomWrapper = styled.TouchableHighlight`
  background-color: ${props => props.bgColor || '#fff'};
  border-radius: 15px;
  border: ${props => props.borderColor ? `1px solid ${props.borderColor}` : 'none'};
`
export const CustomButtomText = styled.Text`
  font-family: "Gordita-Bold";
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.32px;
  text-align: center;
  color: ${props => props.textColor || '#01272F'};
`

export default StyleSheet.create({
  customButtomWrapper: {
    paddingHorizontal: 30,
    ...Platform.select({
      ios: {
        paddingVertical: 13,
      },
      android: {
        paddingVertical: 15,
      },
    }),
  },
  customButtomText: {
    ...Platform.select({
      ios: {
        paddingTop: 6,
      },
    }),
  },
});