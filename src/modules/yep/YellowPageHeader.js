import React from 'react';
import { View, Image, Text, StatusBar, TouchableOpacity } from 'react-native';
import styles from './styles';

const yellowIcon = require('../../images/yplogo.png');
const closeIcon = require('../../images/close.png');

const YellowPageHeader = ({ show = false, handleClose = {} }) => {
  if (show) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor='#FFCF00' />
        <View style={styles.contentContainer}>
          <Image source={yellowIcon} style={styles.logo} />
          <Text style={styles.infoText}>Welcome to Yep! – the new home of Yellow Pages</Text>
        </View>
        <TouchableOpacity onPress={handleClose}>
          <Image source={closeIcon} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
    )
  } else {
    return null
  }
}

export default YellowPageHeader
