import React from 'react';
import { View, Image, TouchableHighlight, } from 'react-native';
import styles, { CategoryCardWrapper, IconContainer, Label, } from '../styles';

const CategoryCard = ({ item, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="#fff">
      <View style={styles.itemCardWrapper}>
        <CategoryCardWrapper style={{justifyContent: 'center'}}>
          <IconContainer>
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
          <Label numberOfLines={3} ellipsizeMode="tail">
            {item.name}
          </Label>
        </CategoryCardWrapper>
      </View>
    </TouchableHighlight>
  );
};

export default CategoryCard;
