import { ImageBackground, Image, TouchableHighlight, View, } from 'react-native';
import React from 'react';
import styles, { DealsCardWrapper, DealsName, DealsLocation, DealsOffer, DealsDescription, } from '../styles';

const badge =  require('../Images/premiumbadge.png');

const DealsCard = ({ item, onPress, goToStore }) => {
  const {
    banner,
    logo,
    name,
    location,
    offer,
    description,
    service_id,
    store_id,
    terms_cond,
  } = item;

  const premiumUser=item?.badges?.premiumStore || {};

  return (
    <View style={{position:'relative'}}>
      <TouchableHighlight onPress={onPress} underlayColor="transparent">
        <View style={Object.keys(premiumUser).length ?{...styles.premiumCardWrapper,...styles.itemCardWrapper} : styles.itemCardWrapper}>
          <DealsCardWrapper>
            <ImageBackground source={{ uri: banner }} style={styles.dealsImageBg}>
              <Image source={{ uri: logo }} style={styles.dealsLogo} />
              <View style={styles.dealsBodyContainer}>
                <DealsName onPress={goToStore}>{name}</DealsName>
                <View style={styles.dealsLocationContainer}>
                  <Image source={require('../Images/location.png')} style={styles.dealsLocationImage} />
                  <DealsLocation>{location}</DealsLocation>
                </View>
                <DealsOffer>{offer}</DealsOffer>
                <DealsDescription>{description}</DealsDescription>
              </View>
            </ImageBackground>
          </DealsCardWrapper>
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
        </View>
      :null}
    </View>
  );
};

export default DealsCard;
