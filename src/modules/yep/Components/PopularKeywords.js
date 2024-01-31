import React from "react";
import { View, Image } from "react-native";
import styles, { PopularKeywordsTitle, PopularKeywordsWrapper, } from "../styles";
import CustomButton from "../CustomButton";

const PopularKeywords = ({ navigation, data }) => {
  return (
    <PopularKeywordsWrapper>
      <Image source={{ uri: (data?.bg_pattern_url || []).length && data?.bg_pattern_url[0] || "" }} style={{position: 'absolute',width:'100%',height:'100%'}} />
      <PopularKeywordsTitle>{data?.title || ""}</PopularKeywordsTitle>
      <View style={styles.popularKeywordsBodyContainer}>
        {
          (data?.popular_keywords || []).map((item, index) => (
            <View key={index} style={{ margin: 10, }}>
              <CustomButton
                title={item}
                bgColor={"#01272F"}
                textColor={"#FFFFFF"}
                onPress={() => navigation.navigate('GetWhat', { prefillKeyword: item })}
                buttonStyles={{paddingVertical:15, paddingHorizontal: 20}}
                titleStyles={{fontSize:12, fontFamily:'Gordita-Medium'}}
              />
            </View>
          ))
        }
      </View>
    </PopularKeywordsWrapper>
  );
}

export default PopularKeywords;
