import React, { Component } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SearchResultsPage from '../Components/SearchResultsPage';
import Modal from 'react-native-modal';
import styles from '../styles';
import {
  getSearchResults,
  setKeyword,
  resetGetWhatData,
  selectSubCategory,
  setCurrentPage,
} from '../../yep';

const {height}= Dimensions.get('screen');
class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal:false,
      currentId:null
    }
  }

  componentDidMount() {
    const { getSearchResults, setCurrentPage, } = this.props;
    getSearchResults();
  }

  onSearch = () => {
    if(this.props.keyword && this.props.selectSubCategory) {
      this.props.setKeyword(this.props.keyword);
    }
    this.props.getSearchResults();
  }

  handleClose=()=>{
    this.setState({
      showModal:false,
      currentId:null
    })
  }

  handleShow=(id)=>{
    const {isLoggedIn,navigation} = this.props;
    if(!isLoggedIn) {
      navigation.navigate('Authentication',{screen:"AuthLanding"});
    }else{
      this.setState({
        showModal:true,
        currentId:id
      });
    }
  }

  render() {
    const {
      navigation,
      searchResults,
      keyword,
      resetGetWhatData,
      getSearchResults,
      subcategories,
      selectedSubcategory,
      selectSubCategory,
      setCurrentPage,
      currentPage,
      selectedLocation,
      searchResultsLoading,
      isLoggedIn
    } = this.props;

    const {showModal,currentId}= this.state;

    return (
      <>
      <SearchResultsPage
        navigation={navigation}
        searchResults={searchResults}
        keyword={keyword}
        getSearchResults={getSearchResults}
        onSearch={this.onSearch}
        resetGetWhatData={resetGetWhatData}
        subcategories={subcategories}
        selectedSubcategory={selectedSubcategory}
        selectSubCategory={selectSubCategory}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        selectedLocation={selectedLocation}
        searchResultsLoading={searchResultsLoading}
        showFavouritesDialog={this.handleShow}
      />
      <Modal
        statusBarTranslucent={true}
        propagateSwipe={true}
        animationInTiming={350}
        backdropOpacity={0.5}
        useNativeDriver={true}
        deviceHeight={height}
        isVisible={isLoggedIn && showModal}
        style={styles.modalContainer}>
      </Modal>
    </>
    );
  }
}

export default connect(
  (state) => {
    const searchResults = state.yepHome.searchResults;
    const servicekeyword = state.yepHome.servicekeyword;
    const selectedCategory = state.yepHome.selectedCategory;
    const selectedSubcategory = state.yepHome.selectedSubcategory;
    const subcategories = selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length
    ? selectedCategory.subcategories
    : [];
    const currentPage = state.yepHome.currentPage;
    return {
      searchResults,
      servicekeyword,
      keyword: state.yepHome.keyword,
      subcategories,
      selectedSubcategory,
      currentPage,
      selectedLocation: state.yepHome.selectedLocation,
      searchResultsLoading: state.yepHome.searchResultsLoading,
      isLoggedIn: !!state.session.securityToken,
    };
  },
  (dispatch) => ({
    getSearchResults: () => dispatch(getSearchResults()),
    resetGetWhatData: () => dispatch(resetGetWhatData()),
    selectSubCategory: (subcategory) => dispatch(selectSubCategory(subcategory)),
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
    setKeyword: (keyword) => dispatch(setKeyword(keyword)),
  })
)(SearchResults);
