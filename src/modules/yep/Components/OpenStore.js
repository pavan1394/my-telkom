import React from "react";
import { ImageBackground, Image, View, Dimensions} from "react-native";
import CustomButton from "../CustomButton";
import styles, { StaticBlockWrapper, StaticBlockTitle, StaticBlockSubTitle, } from "../styles";

const {width}= Dimensions.get('screen');

const OpenStore = ({ navigation, data }) => {
  return (
    <View style={styles.itemCardWrapper}>
      <StaticBlockWrapper>
        <ImageBackground source={{uri : (data?.bg_image_url || []).length && data?.bg_image_url[0] || ""}} style={styles.staticBlockImageBg}>
          <Image source={{uri : (data?.icon || []).length && data?.icon[0] || ""}} style={{width:width*0.13,height:width*0.13,}}/>
          <StaticBlockTitle>{data?.title || ""}</StaticBlockTitle>
          <StaticBlockSubTitle>
            {data?.sub_title || ""}
          </StaticBlockSubTitle>
          <View style={{ marginTop: 10, }}>
            <CustomButton
              title={data?.button_text || ""}
              bgColor={"#00C1BC"}
              onPress={() => {
                // navigation.navigate('VendorPage');
              }}
            />
          </View>
        </ImageBackground>
      </StaticBlockWrapper>
    </View>
  );
}

export default OpenStore;
