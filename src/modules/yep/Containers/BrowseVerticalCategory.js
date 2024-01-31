import React, { Component } from 'react';
import { connect } from 'react-redux';
import BrowseVerticalCategoryPage from '../Components/BrowseVerticalCategoryPage';
import {
  selectCategory,
} from '../yep';


class BrowseVerticalCategory extends Component {

  onSelectCategory = (category) => {
    this.props.selectCategory(category);
    this.props.navigation.navigate('GetWhere');
  }

  render() {
    const {
      categories,
      categoriesLoading,
      navigation,
    } = this.props;
    return (
      <BrowseVerticalCategoryPage
        categories={categories}
        categoriesLoading={categoriesLoading}
        onSelectCategory={this.onSelectCategory}
        navigation={navigation}
      />
    );
  }
}

export default connect(
  (state, props) => {
    const categories = state.home.categories;
    const categoriesLoading = state.home.categoriesLoading;

    return {
      categories,
      categoriesLoading,
    };
  },
  {
    selectCategory,
  }
)(BrowseVerticalCategory);