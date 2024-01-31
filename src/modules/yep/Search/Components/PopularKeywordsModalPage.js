import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, Image, Text, View, StyleSheet, Button, ScrollView } from "react-native";
import CustomButton from '../../../Common/CustomButton';
import styles, {BottomDrawerHeading, BottomDrawerWrap} from '../styles';
import { GetWhatInput, GetWhatInputContainer, GetWhatInputWrapper } from '../../../Common/Header/styles';
import SuggestionList from '../../../Common/SearchSuggestion';


export default (props) => {
  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
  const [transformY, setTransformY] = useState(new Animated.Value(5000));
  
  const {
    onClose,
    popularKeywords,
    onSearchByKeyword,
    keyword,
    keywords,
    recentKeywords,
    onSearchByInput,
    getWhatLoading,
  } = props;

  useEffect(() => {
    setTimeout(() => {
      fadeIn();
    }, 300);
    return () => fadeOut();
  }, []);

  const fadeIn = () => {
    Animated.timing(transformY, {
      toValue: 1,
      duration: 1000,
    }).start();
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(transformY, {
      toValue: 5000,
      duration: 1000,
    }).start();
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300
    }).start();
  };
  const shouldShowRecentKeywords = (!keywords || !keywords.length) && (recentKeywords && recentKeywords.length);
  const suggestionList = shouldShowRecentKeywords ? recentKeywords : keywords;
  const suggestionListTitle = shouldShowRecentKeywords ? 'Recent Keywords' : 'Keywords';
  return (
    <>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          // alignItems: 'flex-end',
          flexDirection: 'row',
          opacity: fadeAnimation,
        }}
      >
        <View
          style={{
            flex: 1,
            // backgroundColor: '',
            position: 'absolute',
            top: 95,
            left: 0, right: 0,
            height: '100%',

        }}>
          <View style={{marginHorizontal: 10}}>
            <GetWhatInputWrapper>
              <GetWhatInputContainer>
                <Image source={require("../Images/search-dark.png")} style={{ height: 12, width: 10, marginRight: 10 }} />
                <GetWhatInput
                  value={keyword}
                  placeholder={'Start typing'}
                  onChangeText={onSearchByInput}
                  style={styles.input}
                />
                {keyword ? (
                  <TouchableOpacity onPress={() => onSearchByInput('')}>
                    <Image
                      source={require("../Images/cancel.png")}
                      style={{
                        // resizeMode: 'center',
                        paddingTop: 5,
                        width: 40,
                        height: 40,
                        marginRight: -25,
                      }} />
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  onPress={() => {}}
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
                  onPress={() => {}}
                  style={{
                    backgroundColor: '#01272F',
                    height: 50,
                    marginHorizontal: 15,
                    borderRadius: 15,
                    marginRight: -10,
                    width: 51,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image source={require("../Images/search-light.png")} style={{ height: 12, width: 11, }} />
                </TouchableOpacity>
              </GetWhatInputContainer>
            </GetWhatInputWrapper>
            <ScrollView style={{
              backgroundColor: '#fff',
              borderRadius: 15,
              paddingHorizontal: 20,
              marginHorizontal: 2,
              maxheight: '50%',
            }}>
              <SuggestionList
                loading={getWhatLoading}
                enteredWord={keyword}
                suggestionList={suggestionList}
                listTitle={suggestionListTitle}
                onPressSuggestion={onSearchByKeyword}
              >
                <View />
              </SuggestionList>
            </ScrollView>
          </View>
        </View>
        <Animated.View
          style={{
            alignSelf: 'flex-end',
            backgroundColor: 'transparent',
            justifyContent: 'center',
            minWidth: '100%',
            // height: 150,
            transform: [{translateY: transformY}],
          }}
        >
          {/* <TouchableOpacity
            onPress={onClose}
            activeOpacity={1}
            style={{flex: 1, backgroundColor: 'transparent'}}
          >

          </TouchableOpacity> */}
          <BottomDrawerWrap>
            <BottomDrawerHeading>
              People also searched for
            </BottomDrawerHeading>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{ flexDirection: 'row'}}>
              {
                popularKeywords.map((keyword, index) => (
                  <View key={index} style={{ marginTop: 20, marginRight: 20, marginBottom: 10, }}>
                    <CustomButton
                      title={keyword}
                      bgColor={"transparent"}
                      borderColor={"#01272F"}
                      onPress={() => {
                        onSearchByKeyword(keyword);
                      }}
                    />
                  </View>
                ))
              }
            </ScrollView>
          </BottomDrawerWrap>
        </Animated.View>
      </Animated.View>
    </>
  )
}