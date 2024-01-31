import React, { Component } from 'react';
import { connect } from 'react-redux';
import filterActions from '../../../redux/filter/actions';
import FilterPage from '../Components/FiltersPage';
import { BackHandler } from 'react-native';
import {
  selectCategory,
  toggleTag,
  getSearchResults,
  setCurrentPage,
} from '../../yep';

const {toggleSortByFilter, toggleOtherFilter, setDistanceFilter, resetFilterData, helpers: filterHelpers} = filterActions;

const sortByFilters = [
  {
    key: 'recommended',
    label: 'Recommended',
  },
  {
    key: 'newest',
    label: 'Newest',
  }
]

const otherFilters = [
  {
    key: 'open',
    label: 'Open Now',
  }
];

class Filters extends Component {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick=()=>{
    this.props.navigation.goBack();
    this.props.resetFilterData();
    return true;
  }

  onSelectCategory = (category) => {
    this.props.selectCategory(category);
  }

  isTagSelected = (tag) => {
    return this.props.selectedTags.findIndex(t => t.id === tag.id) > -1;
  }

  onClose = () => {
    this.props.navigation.goBack();
  }

  checkSortFilterApplied = (filter) => {
    return filterHelpers.isFilterApplied(this.props.appliedSortByFilters, filter);
  }

  checkOtherFilterApplied = (filter) => {
    return filterHelpers.isFilterApplied(this.props.appliedOtherFilters, filter);
  }

  onResetFilters = () => {
    this.props.navigation.goBack();
    this.props.resetFilterData();
    this.props.setCurrentPage(1);
    this.props.getSearchResults();
  }

  onApplyFilter = () => {
    this.props.navigation.goBack();
    this.props.setDistanceFilter(this.props.distance || 5);
    this.props.setCurrentPage(1);
    this.props.getSearchResults();
  }


  render() {
    return (
      <FilterPage
        onClose={this.onClose}
        navigation={this.props.navigation}
        categories={this.props.categories}
        selectedCategory={this.props.selectedCategory}
        categoriesLoading={this.props.categoriesLoading}
        selectedSubcategory={this.props.selectedSubcategory}
        onSelectCategory={this.onSelectCategory}
        tags={this.props.tags}
        toggleTag={this.props.toggleTag}
        isTagSelected={this.isTagSelected}
        sortByFilters={sortByFilters}
        otherFilters={otherFilters}
        appliedSortByFilters={this.props.appliedSortByFilters}
        appliedOtherFilters={this.props.appliedOtherFilters}
        distance={this.props.distance}
        toggleSortByFilter={this.props.toggleSortByFilter}
        toggleOtherFilter={this.props.toggleOtherFilter}
        setDistanceFilter={this.props.setDistanceFilter}
        checkSortFilterApplied={this.checkSortFilterApplied}
        checkOtherFilterApplied={this.checkOtherFilterApplied}
        onApplyFilter={this.onApplyFilter}
        onResetFilters={this.onResetFilters}
        showDistanceFilter={this.props.showDistanceFilter}
        showYellowPageHeader={this.props.showYellowPageHeader}
        handleGoBack={this.handleBackButtonClick}
      />
    )
  }
}

export default connect(
  (state, action) => {
    const categories = state.yepHome.categories && state.yepHome.categories.length ? state.yepHome.categories : []
    const selectedCategory = state.yepHome.selectedCategory;
    const selectedSubcategory = state.yepHome.selectedSubcategory;
    const location = state.yepHome.selectedLocation;
    return {
      categories,
      selectedCategory,
      selectedSubcategory,
      categoriesLoading: state.yepHome.categoriesLoading,
      tags: state.yepHome.tags,
      selectedTags: state.yepHome.selectedTags,
      appliedSortByFilters: state.filter.sortBy,
      appliedOtherFilters: state.filter.others,
      distance: state.filter.distance,
      showDistanceFilter: !!(location && location.geo && location.current),
      showYellowPageHeader: state.yepHome.showYellowPageHeader
    }
  },
  {
    selectCategory,
    toggleTag,
    toggleSortByFilter,
    toggleOtherFilter,
    setDistanceFilter,
    getSearchResults,
    resetFilterData,
    setCurrentPage,
  }
)(Filters);