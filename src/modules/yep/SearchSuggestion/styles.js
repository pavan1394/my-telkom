import styled from "styled-components/native";
import { StyleSheet, Platform } from 'react-native';

export const HorizontalDivider = styled.View`
  border: 1px solid rgba(153,169,172,0.3);
  margin: 30px 0;
`;

export const SuggestionTitle = styled.Text`
  font-family: "Gordita-Bold";
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: #01272F;
`;

export const ItemWrapper = styled.TouchableOpacity`
  margin-top: 25px;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const ItemName = styled.Text`
  font-family: "Gordita-Regular";
  font-size: 14px;
  align-items: center;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: #01272F;
  align-self: center;
`;

export const ItemNameBold = styled.Text`
  font-family: "Gordita-Bold";
  font-size: 14px;
  align-items: center;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: #01272F;
  align-self: center;
`;

export default StyleSheet.create({
  itemName: {
    ...Platform.select({
      ios: {
        paddingTop: 7,
      },
    }),
  }
});
