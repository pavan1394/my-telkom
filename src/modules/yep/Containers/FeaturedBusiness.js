import React, { Component } from 'react';
import FeaturedBusinessPage from '../Components/FeaturedBusinessPage';

class FeaturedBusiness extends Component {

  render() {
    const { list, navigation } = this.props;
    return (
      <FeaturedBusinessPage
        featuredBusiness={list}
        navigation={navigation}
      />
    );
  }
}

export default FeaturedBusiness;
