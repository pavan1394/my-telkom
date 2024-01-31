import React, { Component } from 'react';
import { connect } from 'react-redux';
import GetWherePage from '../Components/GetWherePage';

import {
  getLocationResults,
  setSelectedLocation,
  getSearchResults,
  getAddressByReverseGeocode,
} from '../../yep';


class GetWhere extends Component {

  skipAndSearch = () => {
    this.props.setSelectedLocation({geo: '', name: ''});
		this.props.getLocationResults('');
    this.props.navigation.navigate('SearchResults');
    this.props.getSearchResults();
  }

  onSearchWithLocation = () => {
    this.props.navigation.navigate('SearchResults');
     this.props.getSearchResults();
  }

  render() {
    const {
      navigation,
      getLocationResults,
      locations,
      setSelectedLocation,
      selectedLocation,
    } = this.props;
    return (
      <GetWherePage
        locations={locations}
        navigation={navigation}
        getLocationResults={getLocationResults}
        setSelectedLocation={setSelectedLocation}
        selectedLocation={selectedLocation}
        skipAndSearch={this.skipAndSearch}
        onSearchWithLocation={this.onSearchWithLocation}
        getAddressByReverseGeocode={this.props.getAddressByReverseGeocode}
        fromWhat={this.props?.route?.params?.fromWhat || false}
      />
    );
  }
}

export default connect(
  (state) => {
    const locations = state.yepHome.locations;

    return {
      locations,
      selectedLocation: state.yepHome.selectedLocation,
    };
  },
  {
    getLocationResults,
    setSelectedLocation,
    getSearchResults,
    getAddressByReverseGeocode
  }
)(GetWhere);
