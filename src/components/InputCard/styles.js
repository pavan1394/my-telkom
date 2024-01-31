import {
  StyleSheet,
  Platform
} from 'react-native';

import styled from "styled-components";
import { fonts } from '../../styles';

export const InputLabel = styled.Text`
  font-family: ${fonts.primaryMedium};
  font-size: 12px;
  text-align: left;
  color: #32545A;
  ${Platform.OS == "ios" ? "padding-top: 10px" : ""}
  ${props => props.style}
`;

export const InputHelperText = styled.Text`
  font-family: ${fonts.primaryMedium};
  font-size: 10px;
  text-align: left;
  color: #32545A;
  opacity: 0.7;
  ${Platform.OS == "ios" ? "padding-top: 10px" : ""}
  ${props => props.style}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: ${fonts.primaryRegular};
  font-size: 14px;
  color: #01272F;
  overflow: hidden;
  border-radius: 16px;
  ${props => props.style}
`;

export const TextInputContainer = styled.View`
  background: #FFFFFF;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  margin-top: 10px;
  font-family: ${fonts.primaryRegular};
  elevation: 12;
  ${props => props.style}
`;

export default StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  rightActionContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  rightActionVerticalCenter: {
  },
  dualLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  activeInputContainer: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    borderRadius: 3,
  },
  inActiveInputContainer: {
    flex: 1,
  },
});
