import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, } from 'react-native';
import FeaturedBusinessCard from '../../Modules/Home/Components/FeaturedBusinessCard';
import CustomList from '../../Common/CustomList';
import styles from '../../Modules/Home/styles';
import Dimensions from '../Dimensions';

class NearByBusiness extends Component {
  render() {
    const { data,navigation } = this.props;

    if (!data.length) return null;

    return (
      <View style={{ paddingHorizontal: 20, paddingTop: 36, backgroundColor: "#E9ECEF", }}>
        <CustomList
          title={"Nearby businesses"}
          data={data.filter(o => !o.gpt)}
          initialNumToRender={1}
          emptyLabel={"Nearby businesses"}
          renderItem={({ item }) => (
            <View style={[styles.cardWrapper, { paddingBottom: 60, }]}>
              <FeaturedBusinessCard
                item={{
                  ...item,
                  id: item?.store_id,
                }}
                customStyle={{ minHeight: Dimensions.pWidth(87), }}
                onPress={() => { navigation.push('Storefront', { storefront: item }) }}
                type2={true}
              />
            </View>
          )}
          padded={false}
        />
      </View>
    );
  }
}
export default connect(
  (state) => ({
    data: state.storefront.nearbyStores || [],
  }),
  {}
)(NearByBusiness);