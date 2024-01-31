import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import styled from "styled-components";
import { colors } from '../../../../styles';

export const Title = styled.Text`
  font-family: Gordita-Bold;
  font-size: 34px;
  letter-spacing: -0.8px;
  color: ${colors.white};
  line-height: 34px;
  ${props => props.style};
`;

export const Body = styled.Text`
  font-family: ${props => props.bold ? 'Gordita-Bold' : 'Gordita-Regular'};
  font-size: 16px;
  line-height: 24px;
  color: ${colors.white};
  ${props => props.style};
`;

export const ItemBody = styled.Text`
  font-family: Gordita-Regular;
  font-size: 12px;
  line-height: 18px;
  color: #01272F;
  align-self: stretch;
`;

export default StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    backgroundColor: colors.black,
  },
  cardWrapper: {
    padding: 20,
    marginBottom: 30
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 10
  },
  laptopViewContainer: {
    position: 'absolute',
    top: '110%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  bgLight: {
    backgroundColor: colors.white
  },
  bgDark: {
    backgroundColor: colors.black
  },
  bgPrimary: {
    backgroundColor: colors.lightBlue
  },
  dark: {
    color: colors.black
  },
  light: {
    color: colors.white
  },
  active: {
    textDecorationLine: Platform.OS === 'ios' ? 'underline' : '',
    // textDecorationStyle: 'solid',
    // textDecorationColor: colors.lightBlue,
    color: colors.lightBlue,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBlue,
  },
});