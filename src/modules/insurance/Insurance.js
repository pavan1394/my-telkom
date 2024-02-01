import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import apiClient from '../../utils/apiClient';
import { PageLoader } from '../../components';
import PrimaryButton from '../../components/PrimaryButton';

const { width, height } = Dimensions.get('window');

const Insurance = ({
  route,
  profile,
  navigation,
}) => {

  return (
    <View style={{ flex: 1, width, height, backgroundColor: '#fff' }}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent={true} />
      <WebView source={{ uri: 'https://telkominsurance.co.za/' }} style={{ flex: 1, backgroundColor: '#fff', }} />
    </View>
  )
}

export default connect(
  state => {
    return {
      profile: state.session.profile,
    };
  }, {
}
)(Insurance);
