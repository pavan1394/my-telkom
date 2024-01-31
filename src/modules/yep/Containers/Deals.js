import React, { Component } from 'react';
import { connect } from 'react-redux';
import DealsPage from '../Components/DealsPage';
// import storeserviceActions from '../../../redux/storeservice/actions';
// import storefrontActions from '../../../redux/storefront/actions';
import {View,TouchableOpacity, Platform} from 'react-native';
import styles, {DealsFooter, DealsFooterDivider, DealsFooterText, DealsFooterContactHeader, DealsFooterContactText} from '../styles';
import {
  getStorefront,
  getStoreservice,
} from '../yep';


class Deals extends Component {

  render() {
    const {
      data,
      storefront,
      getStoreservice,
      user,
      isPadded = true,
      shouldGetAQuote = true,
      titleStyles = {},
      navigation
    } = this.props;
    return (
      <View style={{width: '100%'}}>
        <DealsPage
          deals={data?.deals ||  []}
          storefront={storefront}
          getStoreservice={getStoreservice}
          user={user}
          title={data?.title || ""}
          isPadded={isPadded}
          titleStyles={titleStyles}
          shouldGetAQuote={shouldGetAQuote}
        />
        <DealsFooter>
          <DealsFooterText>{data?.description || ""}</DealsFooterText>
          <DealsFooterDivider/>
          <DealsFooterContactHeader>Want to advertise here?</DealsFooterContactHeader>
          <TouchableOpacity onPress={()=> {
            // navigation.navigate('ContactUs');
          }} style ={{width: Platform.OS === 'ios' ? '70%' : '75%'}}>
            <DealsFooterContactText>Contact us to submit your deal</DealsFooterContactText>
          </TouchableOpacity>
        </DealsFooter>
      </View>
      
    );
  }
}

export default connect(
  (state, props) => {
    return {
      storefront: state.yepHome.storefront,
      user: state.session.profile,
    };
  },
  {
    getStoreservice,
    getStorefront,
  }
)(Deals);
