import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Button from '../CustomButton';

const phones= require('../Images/Phones.png');
const {width}= Dimensions.get('screen');

const FindYourStore = ({ callback , data }) => {
  return (
    <View style={{alignItems: 'center',backgroundColor:'#FFCF00',borderRadius:20,paddingHorizontal: 20,marginTop: 60,marginBottom: 20, marginHorizontal: 20, position: 'relative'}}>
      <Image source={{ uri: data?.bg_pattern_url || "" }} style={{position: 'absolute',width:'100%',height:'100%'}} />
      <Image source={{ uri: data?.image_url || "" }} style={{width:width*0.8,height:width,marginTop:-40}} />
      <View style={{width:'100%'}}>
        <Text style={{fontFamily:'Gordita-Bold', color:'#01272F',fontSize:32,lineHeight:42,letterSpacing:-1}}>{data?.title || ""}</Text>
        <Text style={{fontFamily:'Gordita-Regular', color:'#01272F',fontSize:14,lineHeight:22,marginTop:5}}>{data?.desc || ""}</Text>
        <Button
          label={(data?.cta || []).length && data?.cta[0].label || ''}
          containerStyle={{ flex: 1,marginTop:50,marginBottom:40 }}
          onPress={callback}
        />
      </View>
    </View>
  );
}

export default FindYourStore;
