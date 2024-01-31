import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { colors, fonts } from "../../styles";
import { useNavigation } from "@react-navigation/native";

const CommonHeader = ({
  leftText,
  subTitle,
  leftIcon,
  rightIcon,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {leftIcon ? <TouchableOpacity style={{ paddingRight: 10, }} onPress={
        () => navigation.goBack()
      }>{leftIcon}</TouchableOpacity> : null}
      {subTitle ?
        <View>
          <Text style={styles.text}>{leftText}</Text>
          {subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null}
        </View>
        :
        <Text style={styles.text}>{leftText}</Text>}
        <View style={{ flex: 1 }} />
      <TouchableOpacity onPress={
        () => navigation.navigate('Settings')
      }>{rightIcon}</TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.blue,
    minHeight: 80,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.primaryBold,
  },
  subTitle: {
    color: '#fff',
    fontSize: 14,
    fontFamily: fonts.primaryMedium,
  }
});

export default CommonHeader;