import React from "react";
import { ImageBackground, Image, View, } from "react-native";
import CustomButton from "../CustomButton";
import styles, { StaticBlockWrapper, StaticBlockTitle, StaticBlockSubTitle, } from "../styles";

const WeaklyDeals = () => {
  return (
    <StaticBlockWrapper>
      <ImageBackground source={require("../Images/weakly-deals-bg.png")} style={styles.staticBlockImageBg}>
        <Image source={require("../Images/bag-dark.png")} />
        <StaticBlockTitle>Weekly Deals</StaticBlockTitle>
        <StaticBlockSubTitle>
          Set up alerts for new deals in my area
        </StaticBlockSubTitle>
        <View style={{ marginTop: 10, }}>
          <CustomButton
            title={"Enable notifications"}
            bgColor={"#00C1BC"}
            onPress={() => { }}
          />
        </View>
      </ImageBackground>
    </StaticBlockWrapper>
  );
}

export default WeaklyDeals;
