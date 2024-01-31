import React from 'react';
import PopularKeywordsModalPage from '../Components/PopularKeywordsModalPage';
import {connect} from 'react-redux';
import {
  getPopularKeywords,
  setKeyword,
  getSearchResults,
  getWhatResults,
} from '../../yep';

class PopularKeywordsModal extends React.Component {

  componentDidMount() {
    if(!this.props.popularKeywords || this.props.popularKeywords.length <= 0) {
      this.props.getPopularKeywords();
    }
  }

  onClose = () => {
    this.props.navigation.goBack();
  }

  onSearchByInput = (searchTerm = '') => {
    this.props.getWhatResults(searchTerm);
  }

  onSearchByKeyword = async (keyword) => {
    this.onClose();
    this.props.setKeyword(keyword);
  }

  render() {
    return (
      <PopularKeywordsModalPage
        onClose={this.onClose}
        onSearchByKeyword={this.onSearchByKeyword}
        onSearchByInput={this.onSearchByInput}
        popularKeywords={this.props.popularKeywords}
        keywords={this.props.keywords}
        recentKeywords={this.props.recentKeywords}
        keyword={this.props.keyword}
        setKeyword={this.props.setKeyword}
        getWhatLoading={this.props.getWhatLoading}
      />
    )
  }
}

export default connect(
  (state) => ({
    recentKeywords: state.session.recentKeywords,
    keywords: state.yepHome.keywords,
    keyword: state.yepHome.keyword,
    popularKeywords: state.yepHome.popularKeywords,
    getWhatLoading: state.yepHome.getWhatLoading,
  }),
  {
    getPopularKeywords,
    setKeyword,
    getSearchResults,
    getWhatResults,
  }
)(PopularKeywordsModal)