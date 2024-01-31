import React, { useEffect, useState } from 'react';
import { FlatList, Image, StatusBar, TouchableOpacity, View, ScrollView, ActivityIndicator, Text, Platform } from 'react-native';
import Header from '../Header';
import Dimensions from '../../Dimensions';
import styles from '../styles';
import { GetWhatInput, GetWhatInputContainer, GetWhatInputWrapper } from '../../styles';
import SuggestionList from '../../SearchSuggestion';
import {ItemName, ItemWrapper, ItemContainer, SuggestionTitle, HorizontalDivider} from '../../SearchSuggestion/styles';
import {navigate} from "../../../../../RootNavigation";
import CertifiedIcon from "../Images/certified.svg"
 
const Storefront = ({ item }) => {
  return (
    <ItemWrapper
      underlayColor="transparent"
      // onPress={() => {navigate('Storefront', {storefront: item}) }}
    >
      <ItemContainer>

        <View style={[styles.logoContainer, ]}>
          {item.logo ?
            <Image source={{ uri: item.logo }} style={styles.logo} />
            :
            <View style={[styles.logo, { alignItems: 'center', justifyContent: 'center'}]}>
              <ItemName style={{ fontSize: 28, textAlign: 'center', fontFamily: 'Gordita-Bold', lineHeight: 40, }}>{item.name.slice(0, 1)}</ItemName>
            </View>
          }
          {item?.is_verified ?
            <TouchableOpacity
              activeOpacity={1}
              style={styles.certifiedContainer}>
              <CertifiedIcon
                width={26}
                height={26}
              />
            </TouchableOpacity>
            :
            null}
        </View>

        <View>
          <ItemName style={{ alignSelf: 'flex-start', }}>{item.name}</ItemName>
          {item.address ?
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={{ width: Dimensions.pWidth(70), color: '#345259', fontSize: 11, fontFamily: 'Gordita-Regular', marginTop: 5, lineHeight: Platform.OS === 'ios' ? 15 : 13}}
            >
              {item.address.complete || ''}
            </Text> : null}
        </View>
      </ItemContainer>
    </ItemWrapper>
  );
}

const GetWhatPage = ({
  navigation,
  keywords,
  recentKeywords,
  storefronts,
  getWhatResults,
  setKeyword,
  getWhatLoading,
  prefillKeyword,
  keyword,
  resetGetWhatData,
}) => {

  useEffect(() => {
    if (prefillKeyword) {
      getWhatResults(prefillKeyword);
    } else {
      resetGetWhatData();
    }
  }, []);

  const onPressSuggestion = (word) => {
    setKeyword(word);
    navigation.navigate('GetWhere',{fromWhat: true});
  };

  const shouldShowRecentKeywords = (!keywords || !keywords.length) && (recentKeywords && recentKeywords.length);
  const suggestionList = shouldShowRecentKeywords ? recentKeywords : keywords;
  const suggestionListTitle = shouldShowRecentKeywords ? 'Recent Keywords' : 'Keywords';

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F8FB', }}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Header title={'What are you looking for?'} back={() => navigation.goBack()} />

      <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.innerContainer}>
        <View style={styles.shadow}>
          <GetWhatInputWrapper>
            <GetWhatInputContainer>
              <Image source={require("../Images/search-dark.png")} style={{ height: 16, width: 16, marginRight: 10, resizeMode: 'contain' }} />
              <GetWhatInput
                value={keyword}
                onChangeText={getWhatResults}
                placeholder={"Find a business, product or service"}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => getWhatResults('')}>
                <Image
                  source={require("../../../../images/close.png")}
                  style={{
                    resizeMode: 'contain',
                    paddingTop: 5,
                    width: Dimensions.pWidth(4.5),
                    height: Dimensions.pWidth(4.5),
                    marginHorizontal: 5,
                  }} />
              </TouchableOpacity>
            </GetWhatInputContainer>
          </GetWhatInputWrapper>
        </View>
        <SuggestionList
          loading={getWhatLoading}
          enteredWord={keyword}
          suggestionList={suggestionList}
          listTitle={suggestionListTitle}
          onPressSuggestion={onPressSuggestion}
        >
          <>
            {(keywords.length && storefronts.length) ? <HorizontalDivider /> : (keyword.length >=3 ? <HorizontalDivider/> : null)}
            {storefronts.length ? (
              <>
                <SuggestionTitle>Recent businesses</SuggestionTitle>
                <FlatList
                  contentContainerStyle={{ paddingBottom: 20 }}
                  data={storefronts}  
                  renderItem={({ item }) => (
                    <Storefront item={item} />
                  )}                    
                  keyExtractor={(item, index) => `${item.name}-${index}`}
                  extraData={keyword}
                />
              </>
            ) : null}
          </>
        </SuggestionList>
      </ScrollView>
    </View>
  );
}

export default GetWhatPage;