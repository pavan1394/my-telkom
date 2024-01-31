import React, { Component } from 'react';
import { DeviceEventEmitter, FlatList, Image, Platform, StatusBar, TouchableOpacity, View, Text, ActivityIndicator, Dimensions as dimens } from 'react-native';
import Header from '../Header';
import Dimensions from '../../Dimensions';
import styles, { SearchText, SearchTextBold } from '../styles';
import { Button } from 'react-native-elements';
import { GetWhatInput, GetWhatInputContainer, GetWhatInputWrapper } from '../../styles';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import RNGooglePlaces from 'react-native-google-places';
import { checkMultiple, request, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import LocationIcon from '../Images/locationIcon.svg';
import { formatSuggestion } from '../../../../utils/validate';

const { height: SCREEN_HEIGHT, width } = dimens.get('window');
export default class GetWherePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingCurrentLocation: false,
    }
  }

  componentDidMount() {
    if (this.props?.fromWhat) {
      this.clearSearchText();
    }
  }

  clearSearchText = () => {
    this.props.setSelectedLocation({ geo: '', name: '' });
    this.props.getLocationResults('');
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  renderItem = ({ item: location, index }) => {
    const { name: enteredLocation } = (this.props.selectedLocation || { name: '' });
    const formattedText = formatSuggestion(enteredLocation, location.name);
    return (
      <TouchableOpacity
        key={location.name}
        onPress={() => this.props.setSelectedLocation(location)}
        style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}
      >
        {/* <LocationIcon
          style={{
            marginLeft: -8,
          }}
        /> */}
        <SearchText
          style={{
            ...Platform.select({
              ios: {
                paddingTop: 3,
              },
            }),
          }}
        >
          {formattedText.preFix}
          {formattedText.bold != '' ? <SearchTextBold>{formattedText.bold}</SearchTextBold> : ''}
          {formattedText.suffix}
        </SearchText>
      </TouchableOpacity>
    );
  };

  setLocation = () => {
    if (Platform.OS === 'android') {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: 'YES',
        cancel: 'NO',
        enableHighAccuracy: true,
        showDialog: true,
        openLocationServices: true,
        preventOutSideTouch: false,
        preventBackClick: false,
        providerListener: true
      })
        .then(
          function (success) {
            // success => {alreadyEnabled: true, enabled: true, status: "enabled"}
            if (success.enabled) {
              // setTimeout(() => {
              this.getCurrentLocation();
              // }, 1000);
            }
          }.bind(this)
        )
        .catch((error) => {
          console.log(error.message);
        });

      DeviceEventEmitter.addListener('locationProviderStatusChange', function (status) {
        // only trigger when "providerListener" is enabled
        console.log(status);
      });
    } else {
      this.getCurrentLocation();
    }
  };

  onGetCurrentPlaceSuccess = async (loc) => {
    const location = { latitude: loc?.location?.latitude || '', longitude: loc?.location?.longitude || '' };
    this.props.getAddressByReverseGeocode(location.latitude, location.longitude, async (response) => {
      if (response.success) {
        const r = response?.data || {};
        const locationName = (r?.completeAddress || '').split(',');
        let name =
          locationName.length
            ? `${locationName[0]} ${locationName[1] ? `,${locationName[1]}` : ''}`
            : r?.subLocality || '';
        name = `${(r?.city && r?.province) ? r.city + ", " + r?.province : name}`;
        this.setState({
          loadingCurrentLocation: false
        });
        this.props.setSelectedLocation({ geo: `${location.latitude},${location.longitude}`, name, current: true });
      } else {
        this.setState({
          loadingCurrentLocation: false
        });
        this.onGetCurrentPlaceFail(response.error);
      }
    });

  }

  onGetCurrentPlaceFail = (error) => {
    this.props.setSelectedLocation({ geo: '', name: '' });
    console.log('e--------', error);
    this.setState({
      loadingCurrentLocation: false
    });
  }

  setCurrentLocation = () => {
    this.setState({
      loadingCurrentLocation: true
    }, async () => {
      RNGooglePlaces.getCurrentPlace()
        .then(async results => {
          const location = results.length ? results[0] : {};
          this.onGetCurrentPlaceSuccess(location);
        })
        .catch(e => {
          this.onGetCurrentPlaceFail(e);
        });
    });
  };

  getCurrentLocation = async () => {
    const iosPermissions = [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.LOCATION_ALWAYS];

    const androidPermissions = [
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
    ];

    const permissions = Platform.OS === 'ios' ? iosPermissions : androidPermissions;

    checkMultiple(permissions)
      .then((statuses) => {
        console.log('STATUSES', statuses);
        if (statuses[permissions[0]] === 'granted' || statuses[permissions[1]] === 'granted') {
          this.setCurrentLocation();
        } else {
          requestMultiple(permissions).then((statuses) => {
            if (statuses[permissions[0]] === 'granted' || statuses[permissions[1]] === 'granted') {
              this.setCurrentLocation();
            }
          });
        }
      });
  };

  onSearchPlace = (text) => {
    this.props.setSelectedLocation({ geo: '', name: text });
    this.props.getLocationResults(text);
  }

  render() {
    const { navigation, locations } = this.props;
    console.log('check----------------------->', LocationIcon, this.props.selectedLocation, locations);
    return (
      <View style={{ flex: 1, backgroundColor: '#F7F8FB' }}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
        <Header title={'Near?'} back={this.goBack} />
        <View style={[styles.innerContainer, this.props.hideHeaderBackground ? styles.noMarginTop : {}]}>
          <View style={styles.shadow}>
            <GetWhatInputWrapper>
              <GetWhatInputContainer>
                {/* <LocationIcon
                  style={{
                    marginTop: Platform.OS === 'ios' ? -2 : -5,
                    marginLeft: -8,
                  }}
                /> */}
                <GetWhatInput
                  value={this.props.selectedLocation.name}
                  onChangeText={this.onSearchPlace}
                  placeholder={'Start typing'}
                  style={[styles.input, { marginLeft: -3 }]}
                />
                <TouchableOpacity onPress={this.clearSearchText}>
                  <Image
                    source={require('../Images/cancel.png')}
                    style={{
                      resizeMode: 'contain',
                      paddingTop: 5,
                      marginTop: Platform.OS === 'ios' ? 3 : 0,
                      width: Dimensions.pWidth(15),
                      height: Dimensions.pWidth(15),
                      marginRight: -20,
                    }}
                  />
                </TouchableOpacity>
              </GetWhatInputContainer>
            </GetWhatInputWrapper>
          </View>

          <TouchableOpacity
            activeOpacity={1}
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              if (!this.state.loadingCurrentLocation) {
                this.setLocation();
              }
            }}
          >
            <Image
              source={require('../Images/location-pin.png')}
              style={{
                marginRight: 10,
                resizeMode: 'contain',
                justifyContent: 'center',
                marginTop: 2,
                width: width * 0.04,
                height: width * 0.04,
              }}
            />
            <SearchText style={{ marginVertical: 0, fontFamily: 'Gordita-Bold' }}>{'Use my current location'}</SearchText>
            {
              this.state.loadingCurrentLocation
                ?
                <ActivityIndicator size="small" color='#00C1BC' style={{ marginLeft: 5 }} />
                :
                null
            }
          </TouchableOpacity>

          <FlatList
            data={locations}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.name}
            extraData={this.props.selectedLocation.name}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 10
            }}
          >
            <Button
              title="Skip and search"
              type="clear"
              titleStyle={[styles.skipText, styles.textPadding, { textDecorationLine: 'underline', fontFamily: 'Gordita-Bold', }]}
              onPress={this.props.skipAndSearch}
            />
            <Button
              title="Search"
              titleStyle={[styles.skipText, styles.textPadding, { color: '#ffffff', padding: 40, fontFamily: 'Gordita-Bold', }]}
              disabled={!this.props.selectedLocation.name}
              buttonStyle={{
                borderRadius: 15,
                backgroundColor: this.props.selectedLocation.name ? '#01272F' : '#99A9AC',
                minHeight: Dimensions.pWidth(15)
              }}
              onPress={this.props.onSearchWithLocation}
            />
          </View>
        </View>
      </View>
    );
  }
}
