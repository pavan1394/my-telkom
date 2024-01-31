import React from "react";
import { 
    StyleSheet,
    View,
    Text
 } from "react-native";
import { colors } from "../styles";

const VR = () => {
    return (
        <View style={styles.container}>
          <View style={styles.vrLine}></View>
        </View>
    )
}
export default VR;
const styles = StyleSheet.create({
   container: {
    justifyContent: 'center',
    alignItems: 'center'
   },
   vrLine: {
    height: 20,
    width: 2,
    borderRightWidth: 2,
    borderColor: colors.green,
    borderStyle: 'dashed'
   }
})