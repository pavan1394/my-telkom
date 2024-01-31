import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import apiClient from '../../utils/apiClient';
import { PageLoader } from '../../components';
import PrimaryButton from '../../components/PrimaryButton';

const { width, height } = Dimensions.get('window');

const GetHelpDetailsPage = ({
  route,
  profile,
  navigation,
}) => {
  const { journey } = route?.params || {};

  const [clevvaJourney, setClevvaJourneyLink] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getClevvaJourneyLink();
  }, []);

  const getClevvaJourneyLink = async () => {
    try {
      setLoading(true);
      const response = await apiClient.post(apiClient.Urls.clevvaJourney, {
        journey: journey,
        serviceNo: '0691002002',
      });
      setClevvaJourneyLink(response.link);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, width, height, backgroundColor: '#fff' }}>
      <PageLoader loading={loading} />
      <WebView source={{ uri: clevvaJourney }} style={{ flex: 1, backgroundColor: '#fff', marginBottom: 10, }} />
      <View>
        <PrimaryButton
          title={'Back'}
          navigation={() => navigation.goBack()}
        />
      </View>
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
)(GetHelpDetailsPage);
