import React, { Component } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, ImageBackground, Text, ActivityIndicator, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import Dimensions from '../../Dimensions';
import { checkIsStorOpen, checkStoreOpenTiming, convertToTimeFormat } from '../../../../utils/validate';
import searchStyles, { Card, StoreTitle, StoreLocation, StoreRatingText, ClosedText, ViewDetailsText, InfoCard, } from '../styles';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { navigate } from '../../../../../RootNavigation';
import { connect } from 'react-redux';
// import FavouriteIcon from 'App/Assets/Images/favourite.svg';
// import SelectedFavouriteIcon from 'App/Assets/Images/favourite_selected.svg';
// import FavouritesAction from 'App/redux/favourites/actions';
// import Cross from '../Images/cross.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import RatingCircle from '../../Components/RatingCircle';
// import CertifiedIcon from "App/Modules/Search/Images/certified.svg"

const badge =  require('../../Images/premiumbadge.png');
const { width } = Dimensions.window;

export const weekLabels = {
  mon: {
    label: 'Monday',
    shortLabel: 'M',
  },
  tue: {
    label: 'Tuesday',
    shortLabel: 'T',
  },
  wed: {
    label: 'Wednesday',
    shortLabel: 'W',
  },
  thu: {
    label: 'Thursday',
    shortLabel: 'T',
  },
  fri: {
    label: 'Friday',
    shortLabel: 'F',
  },
  sat: {
    label: 'Saturday',
    shortLabel: 'S',
  },
  sun: {
    label: 'Sunday',
    shortLabel: 'S',
  },
  publicHolidays: {
    label: 'Public Holidays',
    shortLabel: '',
  }
}

const trading_hour = {
  mon: {
    open: "800",
    close: "1700"
  },
  tue: {
    open: "800",
    close: "1700"
  },
  wed: {
    open: "800",
    close: "1700"
  },
  thu: {
    open: "800",
    close: "1700"
  },
  fri: {
    open: "800",
    close: "1700"
  }
};

export const makeAddressString = (address) => {
  let str = '';
  if (address) {
    if (address.streetNumber) {
      str = `${address.streetNumber}, `;
    }
    if (address.streetName) {
      str += `${address.streetName}, `;
    }
    if (address.locality === address.province) {
      str += `${address.locality || address.province}, `;
    } else {
      if (address.locality) {
        str += `${address.locality}, `;
      }
      if (address.province) {
        str += `${address.province}`;
      }
    }
    // if (!address.streetName && (address.province && address.locality)) {
    //   str += `, ${address.province}, ${address.locality}`;
    // }
  }
  return str;
}

class SearchResultCard extends Component {

  state = {
    showInfoCard: false,
  };

  toggleShowInfoCard = () => {
    this.setState({ showInfoCard: !this.state.showInfoCard });
  };

  goBack = () => {
    this.props.navigation.goBack();
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity key={item.name} onPress={() => { }} style={{ flexDirection: 'row', }}>
      </TouchableOpacity>
    )
  }

  render() {
    let {
      storeData,
      navigation,
      showFavouritesDialog,
      storefront,
      removeFromAllFavouritesList,
      getAllFavouritesList,
      allFavouritesList,
      loadingKeys,
    } = this.props;
    const weekday = moment().format('ddd').toLowerCase();
    let store = storeData;
    if (!store) {
      return null;
    }

    store = {
      ...store,
      trading_hour: (store && store.trading_hour && Object.keys(store.trading_hour).length) ? store.trading_hour : trading_hour,
    };

    const address = makeAddressString(store.address);
    const isOpen = checkIsStorOpen(store.trading_hour, weekday);

    console.log("Store Details =========>", store);

    let store_gallery = [
      ...(store && store.gallery || []),
      ...(
        store &&
        store.service &&
        store.service.length &&
        (store.service.find(o => o && o.gallery && o.gallery.length) || {}).gallery || []
      )
    ];

    const favouriteStore = allFavouritesList.find(obj => obj.store_id == store?.store_id);
    let favourite_Ids = [];
    (favouriteStore?.favourite || []).map(o => {
      favourite_Ids.push(o.item_id);
    });

    const premiumUser=store?.badges?.premiumStore || {};

    return (
      <View style={searchStyles.shadow}>
        <View style={{position:'relative'}}>
          <Card onPress={() => {
            // navigate('Storefront', { storefront: store })
          }} activeOpacity={1} style={Object.keys(premiumUser).length ? {...styles.container,...styles.premiumCardWrapper,borderColor:premiumUser?.bgColor || "#FFCF00"} : styles.container}>
            <View>
              <View style={[styles.flexRow, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }]}>
                <View style={styles.logoContainer}>
                  {store?.logo?
                    <Image source={{ uri: store.logo }} style={styles.logo} />
                    :
                    <View style={[styles.logo, { alignItems: 'center', justifyContent: 'center'}]}>
                    <Text style={{fontFamily:"Gordita-Bold",fontSize:20,color:'#01272F'}}>
                      {store?.name? store.name[0] : ""}
                    </Text>
                    </View>
                  }
                  {/* {store?.is_verified ?
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.certifiedContainer}>
                      <CertifiedIcon
                        width={26}
                        height={26}
                      />
                    </TouchableOpacity>
                    :
                    null} */}
                </View>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                  {/* <TouchableOpacity
                    style={styles.favouriteButton}
                    onPress={() => {
                      if (favouriteStore) {
                        const payload = {
                          favourite_Ids: favourite_Ids,
                          is_deleted: 1,
                          id: store.store_id,
                        };

                        navigation.navigate('ConfirmationPopUp', {
                          title: "You are about to remove this store from your favourites.",
                          label: "This will remove this store from your favourites.",
                          onPress: () => {
                            removeFromAllFavouritesList(
                              payload,
                              storefront?.store_id,
                              () => {
                                setTimeout(() => {
                                  getAllFavouritesList({ storeId: storefront?.store_id });
                                  getAllFavouritesList({ storeId: storefront?.store_id });
                                  navigation.goBack();
                                }, 500);
                              }
                            );
                          },
                          buttonTitle: 'Yes, remove',
                          icon: require('../../Images/delete.png'),
                          cancelButtonTitle: 'Cancel',
                          labelStyle: {
                            color: '#01272F',
                            fontSize: 14,
                          },
                          buttonTextStyle: {
                            fontSize: 14,
                          },
                          shouldGoBack: false,
                          favouriteStoreId: store.store_id,
                        });
                      } else {
                        showFavouritesDialog(store.store_id);
                      }
                    }}
                    {...this.props.favouriteButtonProps}
                  >
                     {loadingKeys[store?.store_id] ?
                      <ActivityIndicator size={'large'} color={'#00C1BC'} />
                      : favouriteStore ? <SelectedFavouriteIcon /> : <FavouriteIcon />}
                  </TouchableOpacity> */}
                  <RatingCircle rating={((store?.avg_rating || 0)/20).toFixed(1)} />
                </View>
              </View>
            </View>
            <View>
              {!this.state.showInfoCard ?
                <>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.flexRow, { alignItems: 'center', marginBottom: 5 }]}
                    onPress={() => {
                      if (store?.badges?.premium_store) {
                        this.toggleShowInfoCard();
                      }
                    }}>
                    {store?.badges?.premium_store ? (
                      <Image style={styles.premiumImage} source={{ uri: store?.badges?.premium_store }} />
                    ) : null}
                    <StoreTitle style={{ color: '#01272F' }}>{store.name}</StoreTitle>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.flexRow, { alignItems: 'center', marginBottom: 15 }]}
                    onPress={() => {
                    }}>
                    <Image source={require("../Images/location.png")} style={[styles.locationImage, { tintColor: "#809397" ,  marginTop: Platform.OS === 'ios' ? 6 : 0, }]} />
                    <StoreLocation style={searchStyles.textPadding}>{address}</StoreLocation>
                  </TouchableOpacity>
                </>
                :
                <InfoCard>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.infoDescription}>{`Premium platform engagement`}</Text>
                  </View>
                  <View style={{ paddingTop: 3, marginLeft: 'auto' }}>
                    <TouchableOpacity onPress={this.toggleShowInfoCard}>
                      {/* <Cross /> */}
                    </TouchableOpacity>
                  </View>
                </InfoCard>
              }
              <Swiper
                autoplay={store_gallery.length > 1}
                showsPagination={true}
                showsButtons={false}
                index={0}
                height={width / 2}
              >
                {
                  store_gallery.length ?
                    store_gallery.map(image => {
                      return (
                        <ImageBackground
                          key={image}
                          source={{ uri: image }}
                          style={styles.galleryImage}
                        />
                      )
                    })
                    :
                    <ImageBackground
                      source={require("../../Images/default_store_bg.png")}
                      style={styles.galleryImage}
                    />
                }
              </Swiper>
              <View style={{ marginVertical: 15 }}>
                <View className="subheading-text gordita-bold fw-700">
                  {isOpen ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                      <ClosedText style={{ color: '#00C1BC', fontFamily: 'Gordita-Bold' }}>Open now</ClosedText>

                      <ClosedText style={{ color: '#01272F', fontFamily: 'Gordita-Bold' }}>{`${convertToTimeFormat(store.trading_hour[weekday].open)} to ${convertToTimeFormat(store.trading_hour[weekday].close)}`}</ClosedText>
                    </View> : null}

                  {!isOpen ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                      <ClosedText style={{ color: '#99A9AC', }}>Closed now</ClosedText>
                      <View style={{ display: 'flex', flex: 1 }} />
                      {checkStoreOpenTiming(store.trading_hour, weekday) ? <ClosedText style={{ color: '#01272F', fontFamily: 'Gordita-Bold' }}>{`Opens at ${convertToTimeFormat(store.trading_hour[weekday].open)}`}</ClosedText> : null}
                    </View> : null}
                </View>
              </View>
              {(store && store.trading_hour && Object.keys(store.trading_hour).length) ?
                <View style={{ marginBottom: 15, }}>
                  <ClosedText style={{ color: '#01272F', }}>{'Operating:'}</ClosedText>
                  <View style={{ flexDirection: 'row', paddingTop: 5, }}>
                    {Object.keys(weekLabels).map((key) => {
                      return (
                        <ClosedText style={{ width: (width / 7) - 5, color: store.trading_hour[key] ? '#01272F' : '#99A9AC', fontFamily: 'Gordita-Bold' }} key={`${store._id}-week-day-${key}`}>{weekLabels[key].shortLabel}</ClosedText>
                      )
                    })}
                  </View>
                </View> : null}
              <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={() => { navigate('Storefront', { storefront: store }) }}>
                <ViewDetailsText style={searchStyles.textPadding}>{'View details'}</ViewDetailsText>
                <FontAwesome
                  name={"angle-right"}
                  style={{
                    color: '#01272F',
                    fontWeight: 'bold',
                    fontSize: 24,
                    alignSelf: 'center',
                  }} />
              </TouchableOpacity>
            </View>
          </Card >
          {Object.keys(premiumUser).length?
            <View style={premiumUser?.bgColor ? {...styles.badge,backgroundColor:premiumUser?.bgColor || "#FFCF00"} : styles.badge}>
              {
                premiumUser?.icon
                ?
                <Image source={{uri:premiumUser.icon}} style={styles.badgeIconFromUrl} />
                :
                <Image source={badge} style={styles.badgeIcon} />
              }
              <Text style={styles.badgeText}>{premiumUser?.label || 'Premium user'}</Text>
            </View>
          :null}
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  premiumCardWrapper: {
    borderWidth:2,
    overflow: 'hidden',
    position: 'relative',
  },
  flexRow: {
    flexDirection: 'row',
  },
  logoContainer: {
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor:'#fff',
    borderRadius: 20,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.185,
    height: width * 0.185,
    borderRadius: 20,
    resizeMode: 'contain',
    zIndex: 2,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
  certifiedContainer: {
    top: -20,
    right: -15,
    position: 'absolute',
    zIndex: 9,
    width: width * 0.065,
    height: width * 0.065,
    overflow: 'hidden',
    marginRight: 10, 
    marginTop: 13,
  },
  certifiedIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  premiumImage: {
    width: 15,
    height: 13,
    marginRight: 15,
  },
  locationImage: {
    width: 12,
    height: 14,
    marginRight: 18,
  },
  galleryImage: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  ratingContainer: {
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: '#01272F',
    borderRadius: (width * 0.1 / 2),
    resizeMode: 'cover',
    // zIndex: 2,
    overflow: 'hidden',
  },
  favouriteImage: {
    width: width * 0.1,
    height: width * 0.1,
    marginRight: 20,
  },
  favouriteButton: {
    height: 35,
    width: 35,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoDescription: {
    flex: 1,
    fontSize: 10,
    lineHeight: 14,
    opacity: 0.85,
    color: '#01272F',
    fontFamily: 'Gordita-Regular',
  },
  badge:{
    paddingHorizontal:12,
    paddingVertical:10,
    backgroundColor:'#FFCF00',
    position: 'absolute',
    top:0,
    right:0,
    borderBottomLeftRadius:20,
    borderTopRightRadius:20,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  badgeIcon:{
    width:Dimensions.pWidth(4.5),
    height:Dimensions.pWidth(4.5),
    marginBottom:5
  },
  badgeIconFromUrl:{
    width:Dimensions.pWidth(3.4),
    height:Dimensions.pWidth(3),
  },
  badgeText:{
    color:'#01272F',
    fontFamily:'Gordita-Medium',
    fontSize:12,
    lineHeight:17,
    marginLeft:7
  },
  featuredBusinessReview:{
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center',
    width:34,
    height:34,
    borderRadius:34,
    backgroundColor:'#01272F',
    marginLeft:20
  },
  reviewText:{
    color:'#fff',
    fontFamily:'Gordita-Bold',
    fontSize:11,
    lineHeight:15,
  }
});

const mapStateToProps = (state) => {
  return {
    storefront: state?.yepHome?.storefront || {},
    allFavouritesList: state.yepHome.allFavouritesList || [],
    loadingKeys: state.yepHome.loadingKeys || {},
  };
};

const mapDispatchToProps = (dispatch) => ({
  favouriteDialog: (storeId) => dispatch(FavouritesAction.show(storeId)),
  getAllFavouritesList: (payload) => dispatch(FavouritesAction.getAllFavouritesList(payload)),
  removeFromAllFavouritesList: (payload, storeId, callback) => dispatch(FavouritesAction.removeFromAllFavouritesList(payload, storeId, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultCard);