import React, { Component } from 'react';
import { connect } from 'react-redux';
import BrowseCategoryPage from '../Components/BrowseCategoryPage';
import {
  getCategories,
  selectCategory,
} from '../yep';

class BrowseCategory extends Component {

  componentDidMount() {
    this.props.getCategories();
  };

  onSelectCategory = (category) => {
    this.props.selectCategory(category);
    this.props.navigation.navigate('GetWhere');
  }

  render() {
    const {
      categories,
      title
    } = this.props;
    return (
      <BrowseCategoryPage
        onSelectCategory={this.onSelectCategory}
        categories={categories}
        title={title}
      />
    );
  }
}

export default connect(null,
  {
    getCategories,
    selectCategory,
  }
)(BrowseCategory);
