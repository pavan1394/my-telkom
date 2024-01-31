import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors, fonts } from "../styles";
const PrimaryButton = ({
  title,
  color,
  background,
  disabled,
  navigation
}) => {
  return (
    <TouchableOpacity
      onPress={navigation}
      style={[
        styles.btn,
        {backgroundColor: disabled ? '#F5F5F5' : (background ? background : '#fff'),
        borderWidth: background ? 0 : 2,
        borderColor: disabled ? colors.grey : '#0083c2'
        }]}>
      <Text style={[styles.btnText, { color: disabled ? colors.grey : (color ? color : '#0083c2' )}]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  btn: {
    // borderWidth: 2,
    // paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 25,
    marginBottom: 30,
  },
  btnText: {
    textAlign: 'center',
    fontFamily: fonts.primaryMedium,
  }
})