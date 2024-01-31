import React, { Component, Fragment } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Platform, } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const getNumber = (numberLike = 0, defaultValue = 0) => {
  return isNaN(numberLike) ? defaultValue : typeof numberLike === 'string' ? parseFloat(numberLike) : numberLike;
};

function paginate(
  totalItems = 0,
  currentPage = 1,
  pageSize = 10,
  maxPages = 10
) {
  
  if(!pageSize || pageSize < 0) {
    pageSize = 10;
  }

  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);

  // ensure current page isn't out of range
  if (currentPage < 1) {
      currentPage = 1;
  } else if (currentPage > totalPages) {
      currentPage = totalPages;
  }

  let startPage, endPage;
  if (totalPages <= maxPages) {
      // total pages less than max so show all pages
      startPage = 1;
      endPage = totalPages;
  } else {
      // total pages more than max so calculate start and end pages
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
          // current page near the start
          startPage = 1;
          endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
          // current page near the end
          startPage = totalPages - maxPages + 1;
          endPage = totalPages;
      } else {
          // current page somewhere in the middle
          startPage = currentPage - maxPagesBeforeCurrentPage;
          endPage = currentPage + maxPagesAfterCurrentPage;
      }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to repeat in the pager control
  let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

  let resultsUpto = totalItems;
  const resultsFrom = (currentPage - 1) * pageSize + 1;
  if (pageSize < totalItems) {
    resultsUpto = pageSize * currentPage
    if (resultsUpto > totalItems) {
      resultsUpto = totalItems;
    }
  }

  const showPrevButton = currentPage > 2;
  const showNextButton = (endIndex + 1) != totalItems;

  // return object with all pager properties required by the view
  return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
      resultsFrom,
      resultsUpto,
      showPrevButton,
      showNextButton,
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageButton: (isActivePage = false, isNavButton = false,) => ({
    borderRadius: 50,
    minHeight: 45,
    minWidth: 45,
    height: 45,
    width: 45,
    backgroundColor: isActivePage ? '#01272F' : isNavButton ? '#FFFFFF' : 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2.5,
    flexShrink: 0,
  }),
  pageIconButton: (hasIcon) => {
    if(hasIcon) {
      return {
        backgroundColor: '#FFFFFF',
      };
    }
    return {};
  },
  pageButtonText: (showWhiteText = false) => ({
    color: showWhiteText ? '#FFFFFF' : '#01272F',
    fontFamily: 'Gordita-Medium',
    fontSize: 14,
  }),
  paginationFooterText: {
    fontFamily: 'Gordita-Medium',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.02,
    textAlign: 'center',
    color: '#345259',
    opacity: 0.7,
    marginTop: 15,
  },
  navIcon: {
    color: '#01272F',
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center',
  },
  textPadding: {
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
    }),
  },
});

const defaultKeyExtractor = item => item.id;
const defaultOnPressItem = item => {};
const defaultRenderItem = () => null;

const PaginationButton = ({onPress, icon, text, isActive}) => {
  const hasIcon = !!icon;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{flexGrow: 0}}
    >
      <View style={[styles.pageButton(isActive, hasIcon), styles.pageIconButton(hasIcon)]}>
        <Text style={[styles.pageButtonText(isActive), hasIcon ? {} : styles.textPadding]}>
          {hasIcon ? icon : (text || '')}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default class PaginatedList extends Component {

	constructor(props) {
    super(props);
    const {keyExtractor, onPressItem, renderItem} = props;
    this._keyExtractor = keyExtractor && typeof keyExtractor === "function" ? keyExtractor : defaultKeyExtractor;
    this._onPressItem = onPressItem && typeof onPressItem === "function" ? onPressItem : defaultOnPressItem;
    this._renderItem = renderItem && typeof renderItem === "function" ? renderItem : defaultRenderItem;
  }

  componentWillUnmount() {
    this.onChangePage(1);
  }

  paginationKeyExtractor = pageNo => pageNo;

  onChangePage = (pageNo) => {
    this.props.onChangePage(pageNo);
  }

  onClickPrev = () => {
    const {currentPage} = this.props;
    const current = getNumber(currentPage, 1);
    const prevPageNo = Math.max(1, current - 1);
    this.props.onChangePage(prevPageNo);
  }

  onClickNext = (totalPages) => {
    const {currentPage} = this.props;
    const total = getNumber(totalPages, 1);
    const current = getNumber(currentPage, 1);
    const next = Math.min(total, current + 1);
    this.props.onChangePage(next);
  }

  renderPageButton = ({item: pageNo}) => {
    const isActivePage = pageNo === this.props.currentPage;
    return (
      <PaginationButton
        onPress={() => this.onChangePage(pageNo)}
        isActive={isActivePage}
        text={pageNo}
      />
    )
  }

  renderListFooter = () => {
    const {
      totalResults,
      currentPage,
      itemsPerPage,
    } = this.props;
    const total = getNumber(totalResults, 1);
    if(total <= 1) {
      return null;
    }
    const limitPagesTo = 3;
    const paginatedData = paginate(total, getNumber(currentPage, 1), getNumber(itemsPerPage, 10), limitPagesTo);
    return (
      <View style={{marginTop: 25, flexShrink: 0, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {paginatedData.showPrevButton ? (
            <>
              <PaginationButton
                icon={<FAIcon name="angle-left" style={styles.navIcon} />}
                onPress={this.onClickPrev}
              />
              {(currentPage >= 4) ? (
                <Fragment>
                  <PaginationButton
                    text={1}
                    onPress={() => this.onChangePage(1)}
                  />
                  <Text>...</Text>
                </Fragment>
              ) : null}
            </>
          ) : null}
          <FlatList
            data={paginatedData.pages}
            keyExtractor={this.paginationKeyExtractor}
            renderItem={this.renderPageButton}
            horizontal
            style={{
              flexGrow: 0,
              flexShrink: 0,
            }}
          />
          {paginatedData.showNextButton ? (
            <Fragment>
              {currentPage != paginatedData.totalPages ? (
                <Fragment>
                  <Text>...</Text>
                  <PaginationButton
                    text={paginatedData.totalPages}
                    onPress={() => this.onChangePage(paginatedData.totalPages)}
                  />
                </Fragment>
              ) : null}
              <PaginationButton
                icon={<FAIcon name="angle-right" style={styles.navIcon}  />}
                onPress={() => this.onClickNext(paginatedData.totalPages)}
              />
            </Fragment>
          ) : null}
        </View>
        <Text style={styles.paginationFooterText}>
          {`${paginatedData.resultsFrom} - ${paginatedData.resultsUpto} of ${paginatedData.totalItems} Results`}
        </Text>
      </View>
    )
  }

	render() {
    const {
      items,
      flatListOptions,
      currentPage,
    } = this.props;

    const listItems = items && items.length > 0 ? items : [];
		return (
			<View style={[ styles.container ]}>
				<FlatList
          {...(flatListOptions || {})}
					data={listItems.filter(o => !o.gpt)}
					keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListFooterComponent={this.renderListFooter}
          extraData={currentPage}
				/>
			</View>
		);
	}
}