import React from 'react';
import { View, Text } from 'react-native'

const LimitedDeal = () => {
  return <View style={{ marginVertical: 40, marginHorizontal: 20 }}>
    <Text style={{
      fontFamily: "Gordita-Regular",
      fontSize: 14,
      lineHeight: 22,
      letterSpacing: -0.2,
    }}>{"Limited offers, for Yep! marketplace browsers like\nyourself. Explore more and you may just find a\ndeal with your name on it."}</Text>
    <View style={{
      opacity: 0.2,
      borderWidth: 1,
      borderColor: "#809397",
      marginVertical: 20,
    }}></View>
    <Text style={{
      fontFamily: "Gordita-Medium",
      fontSize: 12,
      lineHeight: 17,
      letterSpacing: -0.02,
      marginBottom: 10,
      color: "#809397",
    }}>{"Want to advertise here?"}</Text>
    <Text style={{
      fontFamily: "Gordita-Bold",
      fontSize: 14,
      lineHeight: 18,
      letterSpacing: -0.2,
      color: "#00C1BC",
    }}>{"Contact us to submit your deal"}</Text>
  </View>;
};

export default LimitedDeal;
