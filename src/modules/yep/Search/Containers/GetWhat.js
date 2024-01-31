import React, { Component } from 'react';
import { connect } from 'react-redux';
import GetWhatPage from '../Components/GetWhatPage';
import {
  getWhatResults,
  setKeyword,
  resetGetWhatData,
} from '../../yep';

class GetWhat extends Component {

  render() {
    const {
      navigation,
      keywords,
      recentKeywords,
      keyword,
      storefronts,
      getWhatResults,
      setKeyword,
      getWhatLoading,
      route,
      resetGetWhatData,
    } = this.props;
    return (
      <GetWhatPage
        navigation={navigation}
        keyword={keyword}
        keywords={keywords}
        recentKeywords={recentKeywords}
        storefronts={storefronts}
        getWhatResults={getWhatResults}
        setKeyword={setKeyword}
        getWhatLoading={getWhatLoading}
        prefillKeyword={route.params && route.params.prefillKeyword || ''}
        resetGetWhatData={resetGetWhatData}
      />
    );
  }
}

export default connect(
  (state) => {
    const keywords = state.yepHome.keywords || [];
    const keyword = state.yepHome.keyword || '';
    const storefronts = state.yepHome.storefronts || [];
    const getWhatLoading = state.yepHome.getWhatLoading;
    const recentKeywords = state.session.recentKeywords || [];

    return {
      keyword,
      keywords,
      recentKeywords,
      storefronts,
      getWhatLoading,
    };
  },
  {
    getWhatResults,
    setKeyword,
    resetGetWhatData,
  }
)(GetWhat);
