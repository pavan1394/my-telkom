import React, { Component } from 'react';
import { connect } from 'react-redux';
import GetWherePage from '../Components/GetWherePage';
import {
  getLocationResults,
  setSelectedLocation,
  getSearchResults,
}
  from '../../yep';

class GetWhere extends Component {

  skipAndSearch = () => {
    this.props.setSelectedLocation({ geo: '', name: '' });
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
        //
        hideHeaderBackground={true}
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
  }
)(GetWhere);
