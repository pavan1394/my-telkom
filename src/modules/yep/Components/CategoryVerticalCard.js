import React from 'react';
import { Image, TouchableHighlight, } from 'react-native';
import styles, { CategoryCardWrapperWithOutBorder, IconContainer, Label, } from '../styles';

const CategoryVerticalCard = ({ item, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="#fff" style={{ marginBottom: 20, }}>
      <CategoryCardWrapperWithOutBorder>
        <IconContainer style={{ marginRight: 20, }}>
          <Image
            source={{ uri: item.iconURL }}
            style={{
              height: 28,
              width: 28,
              tintColor: '#fff',
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </IconContainer>
        <Label numberOfLines={3} ellipsizeMode="tail" style={[styles.textPadding, { width: "75%", textAlign: "left" }]}>
          {item.name}
        </Label>
      </CategoryCardWrapperWithOutBorder>
    </TouchableHighlight>
  );
};

export default CategoryVerticalCard;
