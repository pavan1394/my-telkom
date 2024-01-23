import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Text } from '../../components/StyledText';

const { width } = Dimensions.get('window');

class Help extends Component {

  state = {
    activeIndex: 0,
  };

  render() {
    const { navigation, banners, loading, } = this.props;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40, }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              
            }}
          />
        }>
          <View style={{ flex: 1, }}>
            <Text>{'Help'}</Text>
          </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: 10,
    padding: 10,
  },
});

export default connect(
  state => {
    return {
      banners: state.home.banners,
      loading: state.home.loading,
      selectedLocation: state.home.selectedLocation,
    };
  }, {
}
)(Help);
