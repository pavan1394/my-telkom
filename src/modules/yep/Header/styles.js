import styled from "styled-components/native";
import Dimensions from "../Dimensions";

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
