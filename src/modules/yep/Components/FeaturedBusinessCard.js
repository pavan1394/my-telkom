import React from 'react';
import { ImageBackground, Image, TouchableHighlight, View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import styles, { FeaturedBusinessCardWrapper, FeaturedBusinessCardContainer, FeaturedBusinessName, FeaturedBusinessLocation, FeaturedBusinessTag, } from '../styles';
import FavouriteIcon from '../Images/favourite.svg';
import SelectedFavouriteIcon from '../Images/favourite_selected.svg';
// import FavouritesAction from 'App/redux/favourites/actions';
import { connect } from 'react-redux';
import { navigate, goBack } from '../../../../RootNavigation';
import RatingCircle from '../Components/RatingCircle';

const badge =  require('../Images/premiumbadge.png');

const FeaturedBusinessCard = ({
  item,
  onPress,
  customStyle = {},
  type2,
  allFavouritesList,
  getAllFavouritesList,
  removeFromAllFavouritesList,
  storefront,
  loadingKeys,
  handleFav
}) => {
  const {
    address,
    gallery,
    id,
    logo,
    name,
    subcategory,
    tag,
    yep_id,
    theme,
    service,
    is_verified,
    favouriteButtonProps = {},
  } = item;

  const tags = (tag || []).slice(0, 1);
  let store_gallery = [
    ...(gallery || []),
    ...(
      service && service.length &&
      (service.find(o => o && o.gallery && o.gallery.length) || {}).gallery || []
    )
  ];
  const bg_image = (store_gallery && store_gallery.length && store_gallery[0]);
  const favouriteStore = allFavouritesList.find(obj => obj.store_id == id);
  let favourite_Ids = [];
  (favouriteStore?.favourite || []).map(o => {
    favourite_Ids.push(o.item_id);
    // favourite_Ids.push(o.list_id);
  });

  const premiumUser=item?.badges?.premiumStore || {};

  return (
    <View style={{position:'relative'}}>
      <TouchableHighlight style={{ borderRadius: 25, overflow: "hidden" }} onPress={onPress} underlayColor="#fff">
        <View style={Object.keys(premiumUser).length ? styles.premiumCardWrapper2 : {}}>
          <FeaturedBusinessCardWrapper>
            <FeaturedBusinessCardContainer type2={type2} style={customStyle}>
              <View style={type2 ? { width: "100%", height: "65%", } : { width: "100%", height: "60%", }}>
                <ImageBackground
                  source={bg_image ? { uri: bg_image } : require('../Images/default_store_bg.png')}
                  style={styles.featuredBusinessImageBg}
                >
                  <View style={styles.featuredBusinessHeaderWrapper}>
                    {
                      logo ? (
                        <View>
                          <Image source={{ uri: logo }} style={styles.featuredBusinessLogo} />
                          {
                            is_verified ? (
                              <TouchableOpacity
                                activeOpacity={1}
                                style={styles.certifiedContainer}>
                                <Image
                                  source={require('../Images/certified.png')}
                                  style={styles.certifiedIcon}
                                />
                              </TouchableOpacity>
                            ) : null
                          }
                        </View>
                      ) : <View />
                    }
                    <TouchableOpacity
                      style={[styles.featuredBusinessFavouriteButton]}
                      onPress={() => {
                        if (favouriteStore) {
                          const payload = {
                            favourite_Ids: favourite_Ids,
                            is_deleted: 1,
                            id: id,
                          };
                          navigate('ConfirmationPopUp', {
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
                                    goBack();
                                  }, 500);
                                }
                              );
                            },
                            buttonTitle: 'Yes, remove',
                            icon: require('../Images/delete.png'),
                            cancelButtonTitle: 'Cancel',
                            labelStyle: {
                              color: '#01272F',
                              fontSize: 14,
                            },
                            buttonTextStyle: {
                              fontSize: 14,
                            },
                            shouldGoBack: false,
                            favouriteStoreId: id,
                          });
                        } else {
                          handleFav(id);
                        }
                      }}
                      {...favouriteButtonProps}
                    >
                      {loadingKeys[id] ?
                        <ActivityIndicator size={'large'} color={'#FFFFFF'} />
                        : favouriteStore ? <SelectedFavouriteIcon /> : <FavouriteIcon />}
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.featuredBusinessBottomContainer}>
                <View style={{flexDirection: 'row',alignItems: 'center',flex:1,justifyContent: 'space-between',marginBottom:10}}>
                  <FeaturedBusinessName numberOfLines={1} type2={type2}>{name}</FeaturedBusinessName>
                  <RatingCircle rating={((item?.avg_rating || 0)/20).toFixed(1)} />
                </View>
                <View style={[styles.featuredBusinessLocationContainer, type2 ? { marginBottom: 5, } : { marginBottom: 0, }]}>
                  <Image source={require('../Images/location-black.png')} style={styles.dealsLocationImage} />
                  <FeaturedBusinessLocation numberOfLines={2} type2={type2}>
                    {address.complete || `${address.locality ? `${address.locality},` : ''} ${address.administrative_area || ''}`}
                  </FeaturedBusinessLocation>
                </View>
                {/* <View style={styles.featuredBusinessTagOuterContainer}>
                  {
                    tags.map((tag, index) => (
                      <View key={index} style={styles.featuredBusinessTagInnerContainer}>
                        <FeaturedBusinessTag>{tag}</FeaturedBusinessTag>
                        {(tags.length - 1) != index ? <View style={styles.tagDot} /> : null}
                      </View>
                    ))
                  }
                </View> */}
              </View>
            </FeaturedBusinessCardContainer>
          </FeaturedBusinessCardWrapper>
        </View>
      </TouchableHighlight>
      {Object.keys(premiumUser).length?
        <View style={premiumUser?.bgColor ? {...styles.badge,backgroundColor:premiumUser.bgColor} : styles.badge}>
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
  );
};

const mapStateToProps = (state) => {
  const { favourites } = state;
  return {
    storefront: state?.vendorStore?.storefront || {},
    allFavouritesList: favourites.allFavouritesList || [],
    loadingKeys: favourites.loadingKeys,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // getAllFavouritesList: (payload) => dispatch(FavouritesAction.getAllFavouritesList(payload)),
  // removeFromAllFavouritesList: (payload, storeId, callback) => dispatch(FavouritesAction.removeFromAllFavouritesList(payload, storeId, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeaturedBusinessCard);
