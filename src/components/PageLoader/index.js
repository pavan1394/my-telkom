import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';


export default function PageLoader({
  loading,
}) {

  return (
    <>
      {loading &&
        <View style={[StyleSheet.absoluteFill,
        {
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          position: 'absolute'
        }]}>
          <ActivityIndicator size={'large'} color={'#102E6A'} />
        </View>}
    </>
  );
}