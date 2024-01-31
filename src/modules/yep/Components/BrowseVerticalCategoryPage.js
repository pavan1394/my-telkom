import React from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import Section from '../Section';
import CategoryVerticalCard from './CategoryVerticalCard';
import CustomVerticalList from '../../../Common/CustomVerticalList';
import CustomButton from '../CustomButton';
import {connect} from 'react-redux';
import { checkFeatureAvailability} from 'App/Utilities';

const BrowseVerticalCategoryPage = ({ categories, categoriesLoading, onSelectCategory, navigation, showYellowPageHeader, user, featuredFlags }) => {
  const multiStoreAvailable = checkFeatureAvailability('ENABLE_MULTIPLE_STOREFRONTS',featuredFlags,user?._id || "");

  return (
    <>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor={showYellowPageHeader?'#FFCF00':'#F7F8FB'} />
      {categoriesLoading ? (
        <Section padded style={{ backgroundColor: 'transparent' }}>
          <ActivityIndicator size="large" />
        </Section>
      ) : (
          <>
            <CustomVerticalList
              title={'What are you looking for?'}
              subtitle={'Select a category to start browsing'}
              data={categories}
              initialNumToRender={10}
              emptyLabel={'Category'}
              renderItem={({ item }) => (
                <CategoryVerticalCard
                  item={item}
                  onPress={() => {
                    onSelectCategory(item);
                  }}
                />
              )}
            />
             <View style={{marginTop: 5,}} />
            <View style={{width: '100%',alignItems: 'center',backgroundColor:'#F7F8FB',marginTop: -30}}>
              <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
                <CustomButton
                  title="Close"
                  bgColor={"transparent"}
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>
          </>
        )}
    </>
  );
};

const mapStateToProps = (state, props) => {
  const {session} = state;
  const {user} = session;
  return {
    user,
    showYellowPageHeader: state.home.showYellowPageHeader,
    featuredFlags: state?.home?.flags || [],
  };
};

export default connect(mapStateToProps)(BrowseVerticalCategoryPage);