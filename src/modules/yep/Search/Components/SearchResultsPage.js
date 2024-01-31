import React, { Component, Fragment } from 'react';
import { FlatList, Image, StatusBar, TouchableOpacity, TouchableHighlight, View, StyleSheet, Text, ActivityIndicator, TouchableWithoutFeedback, Platform } from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import { GetWhatInput, GetWhatInputContainer, GetWhatInputWrapper } from '../../styles';
import SearchResultCard from './SearchResultCard';
import Dimensions from '../../Dimensions'
import searchStyles, { SearchText, SubCategoryText, } from '../styles';
import PaginatedList from '../../Pagination';
import {connect} from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
const { height, width } = Dimensions.window;
// import LocationIcon from "../Images/Pin.svg"

class SearchResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeSearch : false,
    }
  }
 
  componentWillUnmount() {
    this.clearSearchText();
  }

  openPopularKeywordsPopop = () => {
    // this.props.navigation.navigate('PopularKeywordsModal');
  }

  goBack = () => {
    this.props.navigation.goBack();
    this.state.closeSearch = true
  }

  renderItem = ({ item: store, index }) => {
    return (
      <SearchResultCard
        key={store.store_id}
        storeData={store}
        navigation={this.props.navigation}
        showFavouritesDialog={this.props.showFavouritesDialog}
      />
    )
  }

  clearSearchText = () => {
    this.props.resetGetWhatData();
    this.state.closeSearch =true;
  }

  onOpenFilters = () => {
    // this.props.navigation.navigate('Filters');
  }

  onSearch = () => {
    if(this.props.keyword){
    this.props.onSearch();
    }
  }

  onChangePage = (pageNumber = 1) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getSearchResults();
  }

  itemListKeyExtractor = item => String(item.store_id);

  selectSubCategory = (subcategory) => {
    this.props.selectSubCategory(subcategory);
    this.onSearch();
  }

  renderSubcategory = ({ item: subcategory }) => {
    const selected = this.props.selectedSubcategory && this.props.selectedSubcategory.id === subcategory.id;
    return (
      <TouchableOpacity
        onPress={() => this.selectSubCategory(subcategory)}
        style={{
          borderRadius: 12,
          height: 37,
          backgroundColor: selected ? '#01272F' : 'transparent',
          marginVertical: 5,
          marginHorizontal: 5,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 12,
          minHeight: 41,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: '#01272F',
          flexDirection: 'row',
        }}
      >
        <SubCategoryText selected={selected}>
          {subcategory.name}
        </SubCategoryText>
        {selected ? (
          <Image
            source={require("../Images/cancel_light.png")}
            style={{
              resizeMode: 'contain',
              paddingTop: 5,
              width: 8,
              height: 8,
              marginLeft: 10
            }} />
        ) : null}
      </TouchableOpacity>
    )
  }

  renderListEmptyCompoent = () => {
    return (
      <View
        style={{
          flex: 1,
          minHeight: 420,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {
          this.props.searchResultsLoading
          ? <ActivityIndicator size="large" color="#01272F" />
          : <Text>No Results</Text>
        }
      </View>
    )
  }

  render() {
    const {
      navigation,
      searchResults,
      keyword,
      getSearchResults,
      subcategories,
      setCurrentPage,
      currentPage,
      selectedLocation,
      showYellowPageHeader
    } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#F7F8FB', }}>
        <View style={{ flex: 1, margin: 10,paddingTop:20 }}>
          <View style={{marginTop:showYellowPageHeader?-50: -20}}>
            <Header
              backgroundColor={'#F7F8FB'}
              statusBarProps={{ barStyle: 'dark-content',backgroundColor:showYellowPageHeader?'#FFCF00':'#F7F8FB' }}
              leftComponent={() => (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.iconLeft}
                  onPress={() => { }}>
                  <Image source={require('../../Images/yep_logo.png')} style={styles.yepLogo} />
                </TouchableOpacity>
              )}
              rightComponent={() => (
                <TouchableOpacity
                  activeOpacity={1}
                  // style={styles.iconLeft}
                  onPress={() => {
                    // navigation.toggleDrawer();
                  }}>
                  <Image source={require('../../Images/hamburger_menu.png')} style={{ height: 12, width: 20, resizeMode: 'contain', }} />
                </TouchableOpacity>
              )}
            />
            <View style={searchStyles.shadow}>
              <GetWhatInputWrapper>
                <GetWhatInputContainer>
                  <Image source={require("../Images/search-dark.png")} style={{ height: 18, width: 18, marginRight: 7, resizeMode: 'contain', }} />
                  <TouchableWithoutFeedback onPress={this.openPopularKeywordsPopop}>
                    <View
                      pointerEvents='box-only'
                      style={{ flex: 1, }}
                    >
                      <Text numberOfLines={1}
                       style={keyword ?
                         {color:'#01272F',fontFamily:'Gordita-Bold',fontSize:14,lineHeight:22, paddingTop: Platform.OS === 'ios' ? 3 : 0, paddingRight: 8, } :
                         {color:'#99A9AC',fontFamily:'Gordita-Medium',fontSize:14,lineHeight:22, paddingTop: Platform.OS === 'ios' ? 3 : 0, paddingRight: 8, }}>
                          {keyword || 'Start typing'}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  {keyword ? (
                    <TouchableOpacity
                      onPress={this.clearSearchText}
                      style={{
                        borderRadius: 15,
                        marginRight: -35,
                        width: 51,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        source={require("../../../../images/close.png")}
                        style={{
                          resizeMode: 'contain',
                          paddingTop: 5,
                          width: Dimensions.pWidth(4),
                          height: Dimensions.pWidth(4),
                        }} />
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity
                    onPress={ keyword ? this.onOpenFilters : null}
                    style={{
                      height: 50,
                      marginHorizontal: 15,
                      borderRadius: 15,
                      marginRight: -15,
                      width: 51,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={require("../Images/filters.png")} style={{ height: 18, width: 16, }} />
                  </TouchableOpacity>
                  <TouchableOpacity
                   onPress= { keyword ? this.onSearch : null }
                    style={ keyword ? {
                      backgroundColor: '#01272F',
                      height: 50,
                      marginHorizontal: 15,
                      borderRadius: 15,
                      marginRight: -10,
                      width: 51,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }:  {
                      backgroundColor: '#809397',
                      height: 50,
                      marginHorizontal: 15,
                      borderRadius: 15,
                      marginRight: -10,
                      width: 51,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={require("../Images/search-light.png")} style={{ height: 16, width: 16, resizeMode: 'contain', }} />
                  </TouchableOpacity>
                </GetWhatInputContainer>
              </GetWhatInputWrapper>
            </View>
            <View>
              <FlatList
                data={subcategories}
                renderItem={this.renderSubcategory}
                horizontal
                extraData={this.props.selectedSubcategory}
              />
            </View>
            <View
              style={{ flexDirection: 'row', }}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={{flexDirection: 'row', flexWrap: 'nowrap', flex: 1, flexShrink: 0, alignItems: 'center'}}
                onPress={() => {
                  // navigation.navigate('GetWhereModal', {
                  //   hideBackground: true,
                  // });
                }}
              >
                {/* <LocationIcon
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    // resizeMode: 'center',
                    // justifyContent: 'center',
                    marginTop: Platform.OS == 'ios' ? 5 : 0,
                    // width: width * 0.04,
                    // height: width * 0.04,
                  }}
                  /> */}
                <SearchText numberOfLines={2} ellipsizeMode={"tail"} style={[searchStyles.textPadding, { width: "60%" }]}>
                  {selectedLocation && selectedLocation.name || "Search by location"}
                </SearchText>
              </TouchableOpacity>
              <SearchText style={searchStyles.textPadding}>{`${this.state.closeSearch ? keyword && searchResults && searchResults.total || 0 :searchResults && searchResults.total || 0 } Results`}</SearchText>
            </View>

          </View>
          <PaginatedList
            items={this.state.closeSearch ? keyword && searchResults && searchResults.data || [] : searchResults && searchResults.data || []}
            totalResults={this.state.closeSearch ? (keyword && searchResults && searchResults || {total: 0}).total : (searchResults && searchResults || {total: 0}).total}
            currentPage={currentPage}
            itemsPerPage={10}
            keyExtractor={this.itemListKeyExtractor}
            renderItem={this.renderItem}
            onChangePage={this.onChangePage}
            flatListOptions={{
              showsVerticalScrollIndicator: false,
              ListEmptyComponent: this.renderListEmptyCompoent,
              style: {
              }
            }}
            paginationOptions={{

            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    fontFamily: 'Gordita-Medium',
    // fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.02,
    color: '#01272F',
    textAlign: 'left',
    padding: 20,
  },
  yepLogo: {
    width: width * 0.2,
    height: width * 0.08,
    resizeMode: 'contain',
  },
  iconLeft: {
    width: width * 0.2,
    height: width * 0.08,
  },
  totalResultsText: {
    fontFamily: 'Gordita-Medium',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.02,
    textAlign: 'center',
    color: '#345259',
  }
});

const mapStateToProps = (state) => {
  return {
    showYellowPageHeader: state.home.showYellowPageHeader
  };
};

export default connect(mapStateToProps)(SearchResultsPage);