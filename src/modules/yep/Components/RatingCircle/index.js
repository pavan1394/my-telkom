import React from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View,Text} from 'react-native';

const mark=4.5;

const RatingCircle=({rating=0,style})=> {
  if(rating>0){
    return (
      <View style={rating>=mark?{...styles.container,backgroundColor:"#FFCF00",...style}:{...styles.container,...style}}>
          <Icon name="star" color={rating>=mark?"#01272F":"#fff"} size={8} />
          <Text style={rating>=mark?{...styles.reviewText,color:"#01272F"}:styles.reviewText}>{rating}</Text>
      </View>
    )
  }else{
    return null
  }
}

export default RatingCircle;