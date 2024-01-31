import React, { useEffect, useE, useRef, useState, useContext } from 'react';
import { ActivityIndicator, Linking, Platform, TouchableOpacity, ScrollView } from 'react-native';
import Dimensions from '../Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FlatList, View, StatusBar, Image, ImageBackground, Dimensions as dimens, } from 'react-native';
import { Button, Text, Card, Tooltip, } from 'react-native-elements';
import moment from 'moment';
// import ReviewsList from '../Reviews/StorefrontReviews';
import { connect, useSelector } from 'react-redux';
import { checkIsStorOpen, defaultTradingHours, ensureHex, getVariationLabel, getStoreDataFromDraft, hex_is_light, } from '../../../utils/validate';
// import FavouritesAction from 'App/redux/favourites/actions';
import Modal from 'react-native-modal';
// import CertifiedIcon from "App/Modules/Search/Images/certified.svg"
import { ColorMatrix, concatColorMatrices, invert, contrast, saturate, sepia, hueRotate, brightness } from 'react-native-color-matrix-image-filters';
import { colors } from '../../../styles';

const badge = require('../Images/premiumbadge.png');

const { height, width } = dimens.get('window');

import styles, {
  StoreLogoWrapper,
  StoreTopViewWrapper,
  StoreTopViewContainer,
  StoreGalleryContainer,
  StoreServiceCardContainer,
  ClaimStorefrontContainer,
  ClaimStorefrontLabel,
  ClaimStorefrontSubLabel,
} from './styles';
// import storefrontActions from '../../redux/storefront/actions';
import { useIsFocused } from "@react-navigation/native";
import { makeAddressString, weekLabels } from '../Search/Components/SearchResultCard';
// import NearByBusiness from './NearByBusiness';
import { ComputeAverage } from '../Reviews/reviewsSummary';
import YepAnalytics from '../../Services/AnalyticsService';
import { CustomText } from '../../Theme/Helpers';
import Swiper from 'react-native-swiper';
// import { mapStyle } from "../../Utilities/mapStyle";
// import VerifiedByYep from 'App/Assets/Images/verified_by_yep.svg';
// import ExcellentService from 'App/Assets/Images/excellent_service.svg';
// import FriendlyService from 'App/Assets/Images/friendly_service.svg';
// import VerifiedByYepInfo from 'App/Assets/Images/verified_by_yep_info.svg';
// import ClaimStorefrontIcon from 'App/Assets/Images/claim_storefront.svg';
// import ArrowRightIcon from 'App/Assets/Images/arrow-right.svg';
// import ClaimStoreActions from '../../redux/claimStore/actions';
// import { DialogContext, DialogView } from 'App/Components';
// import Map from 'App/Components/Map';
import { checkFeatureAvailability } from 'App/Utilities';
import FavouriteModal from 'App/Modules/Favourites/components/FavouriteModal';
import MarkdownText from 'App/Components/MarkdownText';

const placeholderImg = require('../../Assets/Images/gallery_placeholder.png');

const Storefront = ({
  services,
  navigation,
  route,
  getStorefront,
  storefrontResponse,
  storefrontLoading,
  reviews,
  user,
  claimStorefrontLoading,
  claimStore,
  securityToken,
  removeFromAllFavouritesList,
  getAllFavouritesList,
  allFavouritesList,
  loadingKeys,
  loadDataFromOnBoard = false,
  showYellowPageHeader = false,
  onBack = () => { },
  featuredFlags,
  isLoggedIn
}) => {
  const ctx = useContext(DialogContext);
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = useState(false);
  let storefront = route?.params?.storefront || {};
  let scrollToRatingSection = route?.params?.scrollToRatingSection || false;
  let isPreviewStore = route?.params?.isPreviewStore || false;
  const draftsData = useSelector((state) => state.onboard.storeDetails || {});
  if (loadDataFromOnBoard) {
    let storeDetails = getStoreDataFromDraft(draftsData)
    storefront = storeDetails;
    storefrontResponse = storeDetails;
    services = storeDetails?.service || [];
  }
  let { onboardingInfo, phoneNumbers, email, website } = storefrontResponse;
  const isImported = storefrontResponse.ownerId ? false : true;
  const scrollViewRef = useRef();
  const mapRef = useRef();
  const markerRef = useRef();
  const scrollViewRef1 = useRef();
  const [activeService, setActiveService] = useState('All');
  const favouriteStore = allFavouritesList.find(obj => obj.store_id == storefrontResponse?.store_id);
  let favourite_Ids = [];
  (favouriteStore?.favourite || []).map(o => {
    favourite_Ids.push(o.item_id);
  });
  const multiStoreAvailable = checkFeatureAvailability('ENABLE_MULTIPLE_STOREFRONTS', featuredFlags, user?._id || "");


  const [collapsed, onToggle] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (scrollToRatingSection &&
        scrollViewRef1 &&
        scrollViewRef1?.current &&
        scrollViewRef1?.current?.scrollTo &&
        typeof scrollViewRef1?.current?.scrollTo == 'function') {
        scrollViewRef1.current.scrollTo({ x: 800, y: 1600, animated: true, });
      }
    }, 1000);
  }, [scrollToRatingSection]);

  navigation && navigation.setOptions({
    headerShown: false,
  })

  let headerTextColor = colors.white;
  let brandColor = colors.lightBlue;
  let headerAltTextColor = colors.black;
  const theme = storefrontResponse ? storefrontResponse.theme : {};
  if (theme) {
    headerTextColor = ensureHex(theme.textColour ? theme.textColour : colors.white);
    brandColor = ensureHex(theme.backgroundColour ? theme.backgroundColour : colors.lightBlue);
  }

  useEffect(() => {
    if (isFocused && !loadDataFromOnBoard) {
      getStorefront(storefront.store_id || storefront.id, (res) => {
        if (res?.is_store_listed == 0) {
          // errorMessage('Store Not Found');
          navigation.goBack();
        }
      });
    }
  }, [isFocused, storefront]);

  const getTimesForToday = (value) => {
    let timeStr = `${value || '000'}`;
    if (timeStr.length === 3) {
      return `0${timeStr.charAt(0)}:${timeStr.slice(1)}`;
    } else {
      return `${timeStr.slice(0, 2)}:${timeStr.slice(2)}`;
    }
  };

  if (storefrontLoading && !loadDataFromOnBoard) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  const NavBar = ({ navigation, showYellowPageHeader = false }) => (
    <>
      <View style={[styles.navBar, showYellowPageHeader && { marginTop: -30 }]}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.iconLeft}
          onPress={() => { }}>
          <Image
            source={require('../../Common/Images/yep_logo.png')}
            style={[styles.yepLogo, { tintColor: headerTextColor, }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{ padding: 20, paddingRight: 5, }}
          onPress={() => {
            StatusBar.setBackgroundColor('#F7F8FB');
            navigation.openDrawer();
          }}>
          <Image
            source={require('../../Common/Images/hamburger_menu.png')}
            style={{ height: 12, width: 20, resizeMode: 'contain', tintColor: headerTextColor, }}
          />
        </TouchableOpacity>
      </View>
    </>
  );

  const TradingHours = () => {
    let tradingHours = storefrontResponse.trading_hour || defaultTradingHours;
    const isPublicHoliday = storefrontResponse?.isTodayPublicHoliday || false;
    const dayKey = isPublicHoliday ? 'publicHolidays' : moment().format('ddd').toLowerCase();
    const isOpen = checkIsStorOpen(tradingHours, dayKey);

    const data = [
      {
        id: 1,
        key: 'is_verified',
        title: 'Verified by Yep!',
        shouldShow: storefrontResponse.is_verified || false,
        logo: <VerifiedByYep />,
      },
      {
        id: 2,
        key: 'excellent_service',
        title: 'Excellent service',
        shouldShow: false,
        logo: <ExcellentService />,
      },
      {
        id: 3,
        key: 'friendly_service',
        title: 'Friendly service',
        shouldShow: false,
        logo: <FriendlyService />,
      },
    ];

    return (
      <View style={{ marginTop: 20, }}>
        <Text style={[styles.serviceHeaderText, { marginBottom: 20, }]}>{`About ${storefrontResponse.name}`}</Text>
        <TouchableOpacity onPress={() => onToggle(!collapsed)}>
          <View style={{ flexDirection: 'row', }}>
            <CustomText
              fontFamily="Gordita-Bold"
              fontSize="16px"
              lineHeight="24px"
              letterSpacing="-0.32px"
              color={"#00C1BC"}
            >
              {isOpen ? 'Open Now' : 'Closed'}
            </CustomText>
            <Image source={require('../../Common/Images/arrow-down.png')} style={[styles.arrowDown, { marginLeft: 10, }, collapsed ? { transform: [{ rotate: '180deg' }] } : {}]} />
          </View>
        </TouchableOpacity>
        {collapsed ?
          <View style={{ marginTop: 20, width: '100%' }}>
            {Object.keys(weekLabels).map((key, index) => {
              let storeFrontTradingForToday = '';
              if (tradingHours[key]) {
                storeFrontTradingForToday = tradingHours[key].open === "0" && tradingHours[key].close === "2359" ? "24 hours" : getTimesForToday(tradingHours[key].open) + " - " + getTimesForToday(tradingHours[key].close);
              } else {
                storeFrontTradingForToday = `Closed`;
              }
              if (isPublicHoliday === false) {
                return (
                  <View key={index} style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                    <Text style={[styles.weekLabelText, key == dayKey ? { color: '#00C1BC' } : {}]}>{weekLabels[key].label}</Text>
                    <Text style={[styles.weekLabelText, key == dayKey ? { color: '#00C1BC' } : {}]}>{storeFrontTradingForToday}</Text>
                  </View>
                )
              }
              else {
                return (
                  <View key={index} style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                    <Text style={[styles.weekLabelText, key == 'publicHolidays' ? { color: '#00C1BC' } : {}]}>{weekLabels[key].label}</Text>
                    <Text style={[styles.weekLabelText, key == 'publicHolidays' ? { color: '#00C1BC' } : {}]}>{storeFrontTradingForToday}</Text>
                  </View>
                )
              }
            })}
          </View> : null}
        {/* store description */}
        {
          storefrontResponse?.processed_description
            ?
            <MarkdownText
              text={storefrontResponse.processed_description}
              onLinkPress={url => Linking.openURL(url)}
              customStyles={{
                paragraph: {
                  fontFamily: 'Gordita-Regular',
                  color: '#01272F',
                  fontSize: 14,
                  lineHeight: 22,
                }
              }}
            />
            :
            <Text style={[styles.storeAddressText, { fontFamily: 'Gordita-Regular', }]}>{storefrontResponse.description}</Text>
        }

        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', }}>
          {data.map((item) => {
            if (!item.shouldShow) return null;
            return (
              <View
                key={item.key}
                style={[{
                  flexBasis: '50%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  marginBottom: 20,
                }]}>
                {item.logo}
                <View style={{
                  flexDirection: 'row',
                  paddingTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {item.key == 'is_verified' ?
                    <Tooltip
                      height={65}
                      width={230}
                      backgroundColor={'#345259'}
                      popover={<Text style={styles.tooltipText}>{"This business has supplied licence and certification information that has been confirmed by Yep!"}</Text>}>
                      <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.verifiedText}>{item.title}</Text>
                        <VerifiedByYepInfo />
                      </View>
                    </Tooltip>
                    :
                    <Text style={[styles.verifiedText, { paddingRight: 0 }]}>{item.title}</Text>
                  }
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  const openMaps = (lat = '', lng = '', label = '') => {
    const latitude = lat;
    const longitude = lng;

    const url = Platform.select({
      ios: "maps:" + latitude + "," + longitude + "?q=" + label,
      android: "geo:" + latitude + "," + longitude + "?q=" + label
    });
    Linking.openURL(url);
  }

  const StoreLocation = () => {
    const latLong = storefrontResponse ? (storefrontResponse.geo || '').split(',') : [];
    const address = storefrontResponse ? (storefrontResponse.address && storefrontResponse.address.complete) : '';
    return (
      <View style={{ paddingTop: 20, paddingBottom: 20, }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <CustomText
            fontFamily="Gordita-Bold"
            fontSize="21px"
            lineHeight="28px"
            letterSpacing="-1px"
          >
            {'Location'}
          </CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
            <Image
              source={require('../../Common/Images/directions.png')}
              style={styles.favouriteImage}
            />
            <CustomText
              fontFamily="Gordita-Bold"
              fontSize="16px"
              lineHeight="24px"
              letterSpacing="-0.32px"
              color={"#00C1BC"}
              onPress={() => openMaps(latLong[0], latLong[1], address)}
            >
              {'Get directions'}
            </CustomText>
          </View>
        </View>
        <Text style={[styles.storeAddressText, { fontFamily: 'Gordita-Medium', }]}>{address}</Text>

        {(latLong.length >= 2 && latLong[0]) ? <Card containerStyle={styles.mapContainer}>
          <Map latitude={latLong[0]} longitude={latLong[1]} zoomButtons={false} />
        </Card> : null}

      </View>
    );
  }

  const SocialLinks = () => {
    const socialHandles = storefrontResponse ? storefrontResponse.socialHandles : [];
    const icons =
      socialHandles?.map((sH, i) => {
        return (
          <TouchableOpacity
            key={`link_${i}`}
            style={{ flex: 0.2, alignItems: "center", }}
            onPress={() => {
              if (sH.handle.includes('http')) {
                Linking.openURL(sH.handle);
              } else if (sH.handle.includes('www')) {
                Linking.openURL(`https://${sH.handle}`);
              } else {
                Linking.openURL(`https://www.${sH.network}.com/${sH.handle}`);
              }
            }}>
            <Icon size={25} color={colors.yepDark} name={sH.network} />
          </TouchableOpacity>
        );
      }) || [];
    if (website) {
      icons.push(
        <TouchableOpacity
          key={'link_web'}
          style={{ flex: 0.2, alignItems: "center", }}
          onPress={() => {
            if (website.includes('http')) {
              Linking.openURL(website);
            } else {
              Linking.openURL(`http://${website}`);
            }
          }}>
          <Image style={styles.webLinkImage} source={require('../../Assets/Images/website_link.png')} />
        </TouchableOpacity>,
      );
    }
    if ((icons || []).length > 0) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', }}>
          <Text style={styles.linksText}>{"Links"}</Text>
          {icons}
        </View>
      );
    } else {
      return null;
    }
  };

  const ClaimStorefront = () => {

    return (
      <ClaimStorefrontContainer>
        <View style={{
          flex: 0.15,
        }}>
          <ClaimStorefrontIcon />
        </View>
        <View style={{ flex: 0.85, }}>
          <ClaimStorefrontLabel>{'Is this your store?'}</ClaimStorefrontLabel>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <ClaimStorefrontSubLabel style={{ lineHeight: 18 }} onPress={() => {
              if (!securityToken) {
                navigation.navigate('Authentication', { screen: 'AuthLanding' });
                return;
              }
              claimStore({ store_id: storefront?.store_id }, (response) => {
                if (response.success) {
                  if (response.conflict) {
                    const bodyLabel = response.data?.length
                      ? `We’ve found multiple storefronts that is associated with this email address. \n\n If you’d like to claim these stores as your own, you will need to fill out an online form for a Yep! agent to assist you.`
                      : `We have found an issue with the email or phone number you entered, if you still want to continue with these details you will need to fill out an online form for a Yep! agent to assist you.`;
                    ctx.show({
                      render: () => (
                        <DialogView
                          title={response.message}
                          body={bodyLabel}
                          image={require('App/Assets/Images/notification.png')} />
                      ),
                      confirmLabel: 'Got it',
                      noCancel: true,
                      onConfirm: () => {
                        ctx.hide();
                        navigation.navigate('ClaimStorefront', {
                          screen: 'HelpClaimingStore',
                          params: {
                            doNotShowHeader: true,
                          }
                        });
                      },
                    });
                  } else {
                    navigation.navigate('ClaimStorefront', {
                      screen: 'ClaimStorefront',
                      params: {
                        claimStoreResponse: response,
                      },
                    });
                  }
                }
              });
            }}>{'Claim this storefront'}</ClaimStorefrontSubLabel>
            <ArrowRightIcon />
          </View>
        </View>
      </ClaimStorefrontContainer>
    )
  }

  const ServiceCard = ({ service, storefront, }) => {
    const image = service.gallery && service.gallery[0] ? { uri: service.gallery[0] } : placeholderImg;
    let variation = service && service.variation && service.variation.length && service.variation[0] || null;

    return (
      <StoreServiceCardContainer>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <View style={{ flex: 0.4, }}>
            <Image source={image} style={styles.serviceImage} />
          </View>
          <View style={{ flex: 0.6, marginLeft: 10, }}>
            <Text numberOfLines={1} style={[styles.serviceName, { textTransform: 'capitalize', }]}>{service.title}</Text>
            <Text numberOfLines={1} style={styles.serviceDescription}>{service.description}</Text>
            {variation ? <Text style={[styles.serviceFee]}>{getVariationLabel(variation)}</Text> : null}
            {storefrontResponse?.ownerId && !loadDataFromOnBoard ? <Text
              style={[styles.getAQuote]}
              onPress={() => {
                if (isPreviewStore || loadDataFromOnBoard) return;
                if (user && storefrontResponse?.ownerId == user?._id) {
                  navigation.navigate('ConfirmationPopUp', {
                    title: "Oops, you can't do that!",
                    label: "As long as you're logged into your Yep! account, you can't engage with your own content or shopfront. If you want to test something, log in to a different Yep! account and try again.",
                    onPress: () => navigation.goBack(),
                    buttonTitle: 'Got it',
                    icon: require('../../Assets/Images/notification.png'),
                  });
                } else {
                  const selectedService = {
                    ...service,
                    id: service.service_id,
                    name: service.title,
                  }
                  navigation.navigate('GetAQuoteLanding', {
                    storefront: storefrontResponse,
                    services: [selectedService],
                    prefilServiceType: true,
                  });
                }
              }}>
              {'Get a quote'}
            </Text>
              : null}
          </View>
        </View>
      </StoreServiceCardContainer>
    )
  }

  const StoreServices = () => {
    let tags = [];
    (services || []).forEach(service => {
      tags.push(service.tag);
    });

    const flattenTags = tags.flat();

    tags = flattenTags.filter(function (item, pos) {
      return flattenTags.indexOf(item) == pos;
    }).filter(tag => tag);

    return (
      <View>
        <CustomText
          fontFamily="Gordita-Bold"
          fontSize="21px"
          lineHeight="28px"
          letterSpacing="-1px"
          style="margin-top:20px;"
        >
          {'Services on offer'}
        </CustomText>
        <FlatList
          horizontal={true}
          style={{ paddingTop: 20, paddingBottom: 10, }}
          data={['All'].concat(tags)}
          keyExtractor={item => item}
          renderItem={({ item, index }) => {
            const check = activeService === item;
            const tagsCount = item === 'All' ? (services || []).length : flattenTags.filter(tag => tag == item).length;
            return (
              <Button
                key={item}
                containerStyle={{ flex: 1 }}
                buttonStyle={[
                  styles.darkButton,
                  !check && { backgroundColor: 'transparent', borderWidth: 0, },
                  Platform.OS == "ios" ? { paddingTop: 12, } : {},
                ]}
                titleStyle={[
                  styles.lightTitle,
                  {
                    color: !check ? '#01272F' : '#FFF',
                    fontSize: 12,
                    fontFamily: 'Gordita-Medium',
                    letterSpacing: -0.32,
                    lineHeight: 17,
                  },
                ]}
                onPress={(e) => {
                  setActiveService(item);
                }}
                title={`${item} (${tagsCount})`}
              />
            )
          }}
        />

        <FlatList
          keyExtractor={(service) => `${service.service_id}`}
          data={activeService === 'All' ? (services || []) : (services || []).filter(service => (service.tag || []).includes(activeService))}
          initialNumToRender={5}
          removeClippedSubviews={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Text style={Fonts.body4}>No services offered yet.</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ServiceCard service={item} alternate storefront={storefrontResponse} />
            </View>
          )}
          style={{ marginTop: 40, }}
        />
      </View>
    )
  }

  const StoreLogo = () => {
    return (
      <View style={styles.logoContainer}>
        {
          storefrontResponse?.logo ?
            <Image source={{ uri: storefrontResponse.logo }} style={styles.logo} />
            :
            <View style={[styles.logo, { alignItems: 'center', justifyContent: 'center' }]}>
              {storefrontResponse?.name ?
                <CustomText
                  fontFamily="Gordita-Bold"
                  fontSize="20px"
                  lineHeight="27px"
                  letterSpacing="-0.5px"
                >
                  {storefrontResponse.name[0]}
                </CustomText>
                : null}
            </View>
        }
        {storefrontResponse?.is_verified ?
          <TouchableOpacity
            activeOpacity={1}
            style={styles.certifiedContainer}>
            {/* <CertifiedIcon
              width={26}
              height={26}
            /> */}
          </TouchableOpacity>
          :
          null}
      </View>
    )
  };

  const StoreDetails = () => {
    const address = storefrontResponse?.address?.complete || '';
    return (
      <>
        <CustomText
          fontFamily="Gordita-Bold"
          fontSize="20px"
          lineHeight="27px"
          letterSpacing="-0.5px"
          style="margin-top: 20px"
        >
          {storefrontResponse.name}
        </CustomText>

        {!loadDataFromOnBoard &&
          <View style={[styles.flexRow, { alignItems: 'center', marginTop: 18, }]}>
            {reviews && reviews.length ? (
              <>
                <View style={{ flexDirection: 'row', alignItems: "center", }}>
                  <Icon style={{ marginRight: 5, marginTop: -2, }} name="star" color={(ComputeAverage(reviews) / 20).toFixed(1) > 4.4 ? '#FFCF00' : "#01272F"} size={12} />
                  <CustomText
                    fontFamily="Gordita-Bold"
                    lineHeight="20px"
                    letterSpacing="-0.32px"
                    style="margin-right: 5px"
                    color={(ComputeAverage(reviews) / 20).toFixed(1) > 4.4 ? '#FFCF00' : "#01272F"}
                  >
                    {(ComputeAverage(reviews) / 20) === 0 ? 0 : (ComputeAverage(reviews) / 20).toFixed(1)}
                  </CustomText>
                  <CustomText
                    fontFamily="Gordita-Medium"
                    lineHeight="20px"
                    letterSpacing="-0.32px"
                    color="#00C1BC"
                  >
                    {`${reviews.length} Reviews`}
                  </CustomText>
                </View>
                <View style={styles.separator} />
              </>) : null
            }
            <TouchableOpacity
              style={[styles.flexRow, {
                alignItems: 'center',
                ...Platform.select({
                  android: {
                    // marginTop: 8,
                  }
                })
              }]}
              onPress={() => {
                // if (favouriteStore) {
                //   const payload = {
                //     favourite_Ids: favourite_Ids,
                //     is_deleted: 1,
                //     id: storefrontResponse?.store_id,
                //   };

                //   navigation.navigate('ConfirmationPopUp', {
                //     title: "You are about to remove this store from your favourites.",
                //     label: "This will remove this store from your favourites.",
                //     onPress: () => {
                //       removeFromAllFavouritesList(
                //         payload,
                //         storefrontResponse?.store_id,
                //         () => {
                //           setTimeout(() => {
                //             getAllFavouritesList({ storeId: storefrontResponse?.store_id });
                //             getAllFavouritesList({ storeId: storefrontResponse?.store_id });
                //             navigation.goBack();
                //           }, 500);
                //         }
                //       );
                //     },
                //     buttonTitle: 'Yes, remove',
                //     icon: require('App/Assets/Images/delete.png'),
                //     cancelButtonTitle: 'Cancel',
                //     labelStyle: {
                //       color: '#01272F',
                //       fontSize: 14,
                //     },
                //     buttonTextStyle: {
                //       fontSize: 14,
                //     },
                //     shouldGoBack: false,
                //     favouriteStoreId: storefrontResponse.store_id,
                //   });
                // } else {
                //   setShowModal(true);
                //   if (!isLoggedIn) {
                //     navigation.navigate('Authentication', { screen: "AuthLanding" });
                //   }
                // }
              }}
            >
              {loadingKeys[storefrontResponse?.store_id] ?
                <ActivityIndicator size={'small'} color={'#00C1BC'} />
                :
                <Icon
                  name={favouriteStore ? "heart" : "heart-o"}
                  color="#01272F"
                  size={20}
                  style={{ marginRight: 10, opacity: 0.7, }}
                />}
              <CustomText
                fontFamily="Gordita-Medium"
                fontSize="12px"
                lineHeight="20px"
                color="#01272F"
              >
                {favouriteStore ? `Added to favourites` : `Add to favourites`}
              </CustomText>
            </TouchableOpacity>
          </View>}
        {address ? <View
          style={[styles.flexRow, {
            alignItems: 'center',
            ...Platform.select({
              android: {
                marginTop: 8,
              }
            })
          }]}
        >
          <FeatherIcon
            name="map-pin"
            color="#345259"
            size={16}
            style={{ marginRight: 10, opacity: 0.7, }}
          />
          <CustomText
            fontFamily="Gordita-Medium"
            lineHeight="20px"
            letterSpacing="-0.32px"
            color="rgba(52,82,89,0.7)"
          >
            {address}
          </CustomText>
        </View> : null}
        {(storefrontResponse && storefrontResponse.slogan) ?
          <CustomText
            fontFamily="Gordita-Medium"
            fontSize="16px"
            lineHeight="22px"
            letterSpacing="-0.32px"
            style="margin-top: 35px"
          >
            {storefrontResponse.slogan}
          </CustomText>
          : null}
        <View style={{ height: 1, width: '100%', backgroundColor: '#99A9AC', marginTop: 20, marginBottom: 20, opacity: 0.3, }} />
        <SocialLinks />
        {((storefrontResponse?.store_claim_status !== 'CLAIMED' && storefrontResponse?.lead_source === 'yp') || !storefrontResponse?.ownerId) ? <ClaimStorefront /> : null}
      </>
    )
  }

  const premiumUser = storefrontResponse?.badges?.premiumStore || {};

  const renderContent = (navigation, showYellowPageHeader) => {
    return (
      <>
        <TopView navigation={navigation} showYellowPageHeader={showYellowPageHeader} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          ref={scrollViewRef}>
          <View style={styles.ccs}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <StoreLogo />
              {Object.keys(premiumUser).length ?
                <View style={premiumUser?.bgColor ? { ...styles.badge, backgroundColor: premiumUser.bgColor } : styles.badge}>
                  {
                    premiumUser?.icon
                      ?
                      <Image source={{ uri: premiumUser.icon }} style={styles.badgeIconFromUrl} />
                      :
                      <Image source={badge} style={styles.badgeIcon} />
                  }
                  <Text style={styles.badgeText}>{premiumUser?.label || 'Premium user'}</Text>
                </View>
                : null}
            </View>
            <StoreDetails />
            <TradingHours />
            <StoreLocation />
            <StoreServices />
            {/* <ReviewsList
              storefrontId={storefrontResponse.store_id}
              storefrontName={storefrontResponse.name}
              navigation={navigation}
              hideReview={loadDataFromOnBoard}
            /> */}
          </View>
          {/* {loadDataFromOnBoard ? null : <NearByBusiness navigation={navigation} />} */}
        </ScrollView>
      </>
    );
  };

  const TopView = (props) => {
    const { navigation, showYellowPageHeader = false } = props;
    let gallery = [
      ...(storefrontResponse && storefrontResponse.gallery || []),
      ...(
        storefrontResponse &&
        storefrontResponse.service &&
        storefrontResponse.service.length &&
        (storefrontResponse.service.find(o => o && o.gallery && o.gallery.length) || {}).gallery || []
      )
    ];

    return (
      <View style={[styles.topViewWrapper, loadDataFromOnBoard && { height: Dimensions.pHeight(40) }]}>
        {hex_is_light(brandColor)
          ?
          <ColorMatrix
            style={[styles.imageContainerStyle, { backgroundColor: brandColor, overflow: 'hidden' }, loadDataFromOnBoard && { height: Dimensions.pHeight(32) }]}
            matrix={concatColorMatrices(invert(1), sepia(0.51), saturate(0.37), hueRotate(0.9), brightness(0.93), contrast(0.92))}
          >
            <ImageBackground
              source={
                (theme && theme.backgroundPatternUrlPNG) ?
                  { uri: theme.backgroundPatternUrlPNG } :
                  require('../../Assets/Images/store_background.png')
              }
              style={[styles.imageContainerStyle, { backgroundColor: brandColor }, loadDataFromOnBoard && { height: Dimensions.pHeight(32) }]}
            />
          </ColorMatrix>
          :
          <ImageBackground
            source={
              (theme && theme.backgroundPatternUrlPNG) ?
                { uri: theme.backgroundPatternUrlPNG } :
                require('../../Assets/Images/store_background.png')
            }
            style={[styles.imageContainerStyle, { backgroundColor: brandColor }, loadDataFromOnBoard && { height: Dimensions.pHeight(32) }]}
          />
        }
        <StoreTopViewContainer style={Platform.OS === "android" ? "top: 40px" : ""}>
          {loadDataFromOnBoard ? null : <NavBar navigation={navigation} showYellowPageHeader={showYellowPageHeader} />}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                loadDataFromOnBoard ? onBack() :
                  multiStoreAvailable ? navigation.goBack() :
                    navigation.goBack();
              }}
              style={styles.arrowBackContainer}>
              {loadDataFromOnBoard ?
                <Image
                  source={require('../../Common/Images/cancel.png')}
                  style={[styles.arrowBack, loadDataFromOnBoard && { width: 14, height: 14, resizeMode: 'contain', marginLeft: 0, marginRight: 5 }]}
                />
                :
                <Image
                  source={require('../../Common/Images/arrow-back.png')}
                  style={[styles.arrowBack, { tintColor: headerTextColor, marginLeft: -20, width: width * 0.2, height: width * 0.04, resizeMode: 'contain', }]}
                />}
              {loadDataFromOnBoard ?
                <CustomText
                  fontFamily="Gordita-Bold"
                  fontSize="14px"
                  lineHeight="27px"
                  letterSpacing="-0.2px"
                  color={headerAltTextColor}
                >
                  {'Close preview'}
                </CustomText>
                :
                <CustomText
                  fontFamily="Gordita-Bold"
                  fontSize="20px"
                  lineHeight="27px"
                  letterSpacing="-0.5px"
                  color={headerTextColor}
                >
                  {'Back to results'}
                </CustomText>}
            </TouchableOpacity>

          </View>
          <Swiper
            autoplay={gallery.length > 1}
            showsPagination={false}
            showsButtons={false}
            index={0}
            height={Dimensions.pHeight(24)}
            containerStyle={{ marginTop: 35, borderRadius: 22.3602, overflow: 'hidden' }}
          >
            {
              gallery.length ?
                gallery.map((image, index) => {
                  return (
                    <Image
                      source={{ uri: image }}
                      style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: 22, overflow: "hidden" }}
                    />
                  )
                })
                :
                <StoreGalleryContainer>
                  <ImageBackground
                    source={require("../../Assets/Images/default_store_bg.png")}
                    style={{ flex: 1, borderRadius: 22.3602, overflow: "hidden" }}
                  />
                </StoreGalleryContainer>
            }
          </Swiper>
        </StoreTopViewContainer>
      </View>
    );
  };

  const onClickCall = () => {
    if (storefrontResponse && storefrontResponse.phone && storefrontResponse.phone.length) {
      YepAnalytics.logEvent('click_to_call');
      Linking.openURL(`tel:${storefrontResponse.phone[0]}`);
    }
  };

  return (
    <>
      <View style={{ flex: 1, }}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={showYellowPageHeader ? "#FFCF00" : brandColor} />
        {claimStorefrontLoading ?
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 99,
          }}>
            <ActivityIndicator size="large" color={'#00C1BC'} />
          </View>
          :
          null}
        <ScrollView ref={scrollViewRef1}>
          {renderContent(navigation, showYellowPageHeader)}
        </ScrollView>

        {
          (
            (storefrontResponse && storefrontResponse.phone && storefrontResponse.phone.length) ||
            (services && services.length)
          ) ?
            <View
              style={[{
                flexDirection: 'row',
                justifyContent: "center",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                padding: 10,
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
              }, Platform.OS === "ios" ? { paddingBottom: 20, } : {}]}
            >
              {isPreviewStore ?
                <Button
                  containerStyle={{ flex: 1 }}
                  buttonStyle={[styles.darkButton]}
                  titleStyle={[styles.lightTitle, { color: '#FFF' }, Platform.OS == "ios" ? { paddingTop: 10 } : {}]}
                  onPress={() => {
                    navigation.goBack();
                  }}
                  title={"Back to editor"}
                />
                :
                (storefrontResponse && storefrontResponse.phone && storefrontResponse.phone.length) ?
                  <Button
                    containerStyle={{ flex: 0.5 }}
                    buttonStyle={[styles.lightButton]}
                    titleStyle={[styles.lightTitle, Platform.OS == "ios" ? { paddingTop: 10 } : {}]}
                    onPress={onClickCall}
                    title="Call"
                  /> : null}
              {(storefrontResponse?.ownerId && services && services.length && !isPreviewStore && !loadDataFromOnBoard) ?
                <Button
                  containerStyle={{ flex: 0.5 }}
                  buttonStyle={[styles.darkButton]}
                  titleStyle={[styles.lightTitle, { color: '#FFF' }, Platform.OS == "ios" ? { paddingTop: 10 } : {}]}
                  onPress={() => {
                    if (user && storefrontResponse?.ownerId == user?._id) {
                      navigation.navigate('ConfirmationPopUp', {
                        title: "Oops, you can't do that!",
                        label: "As long as you're logged into your Yep! account, you can't engage with your own content or shopfront. If you want to test something, log in to a different Yep! account and try again.",
                        onPress: () => navigation.goBack(),
                        buttonTitle: 'Got it',
                        icon: require('../../Assets/Images/notification.png'),
                      });
                    } else {
                      let tags = [];
                      (services || []).forEach(service => {
                        tags.push(service.tag);
                      });

                      const flattenTags = tags.flat();

                      tags = flattenTags.filter(function (item, pos) {
                        return flattenTags.indexOf(item) == pos;
                      }).filter(tag => tag);
                      navigation.navigate('GetAQuoteLanding', {
                        storefront: storefrontResponse,
                        prefilServiceType: false,
                        services: (services || []).map(service => {
                          return {
                            ...service,
                            id: service.service_id,
                            name: service.title,
                          }
                        }),
                      });
                    }
                  }}
                  title="Get a quote"
                /> : null}
            </View> : null}
      </View>
      <Modal
        statusBarTranslucent={true}
        propagateSwipe={true}
        animationInTiming={350}
        backdropOpacity={0.5}
        useNativeDriver={true}
        deviceHeight={height}
        isVisible={isLoggedIn && showModal}
        style={styles.modalContainer}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <FavouriteModal storeId={storefrontResponse.store_id} handleClose={() => setShowModal(false)} />
        </ScrollView>
      </Modal>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { user, securityToken } = state.session;
  const { favourites } = state;
  return {
    // isClaimLoading: state.vendor.isLoading,
    // claimModalVisible: state.vendor.claimModalVisible,
    services: state.storefront.storefront.service,
    storefrontResponse: state.storefront.storefront,
    storefrontLoading: state.storefront.storefrontLoading,
    reviews: state.reviews.reviews,
    user,
    claimStorefrontLoading: state.claimStore.claimStorefrontLoading,
    securityToken,
    allFavouritesList: favourites.allFavouritesList || [],
    loadingKeys: favourites.loadingKeys,
    showYellowPageHeader: state.home.showYellowPageHeader,
    featuredFlags: state?.home?.flags || [],
    isLoggedIn: !!state.session.securityToken,
  };
};

//we cache storefront services under the id of the storefront
const mapDispatchToProps = (dispatch) => ({
  getStorefront: (id, callback) => dispatch(storefrontActions.getStorefront(id, callback)),
  claimStore: (payload, callback) => dispatch(ClaimStoreActions.claimStore(payload, callback)),
  // getAllFavouritesList: (payload) => dispatch(FavouritesAction.getAllFavouritesList(payload)),
  // removeFromAllFavouritesList: (payload, storeId, callback) => dispatch(FavouritesAction.removeFromAllFavouritesList(payload, storeId, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Storefront);