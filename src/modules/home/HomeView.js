import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Carousel from "react-native-reanimated-carousel";
import {
  getDashboardData,
} from './home';
import { PageLoader } from '../../components';
import { Text } from '../../components/StyledText';

const { width } = Dimensions.get('window');
const PAGE_WIDTH = width;
const colors = [
  "#26292E",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

class HomeScreen extends Component {

  state = {
    activeIndex: 0,
  };

  componentDidMount() {
    this.props.getDashboardData();
  }

  Item = (index) => {
    return (
      <View style={[styles.itemContainer]}>
        {typeof index === "number" && <Text style={{ fontSize: 30, color: "black" }}>{index}</Text>}
      </View>
    );
  }

  render() {
    const { navigation, dashboardData, loading, } = this.props;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40, }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={this.props.getDashboardData}
          />
        }>
        <View style={{ flex: 1, }}>
          {loading ? <PageLoader /> : null}
          {(dashboardData?.balances?.resourceBalance || []).map((obj, i) => {
            return (
              <View key={`${obj.typeName}-$${i}`}>
                <Text style={{ fontSize: 18, padding: 10, color: "black" }}>{obj.typeName}</Text>
              </View>
            )
          })

          }
          {/* <Carousel
            // {...baseOptions}
            style={{
              width: PAGE_WIDTH,
            }}
            loop
            pagingEnabled={true}
            snapEnabled={true}
            autoPlay={true}
            autoPlayInterval={1500}
            // onProgressChange={(_, absoluteProgress) =>
            //   (progressValue.value = absoluteProgress)
            // }
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            data={colors || dashboardData?.balances?.resourceBalance || []}
            renderItem={({ index }) => (
              <Text style={{ fontSize: 30, color: "black" }}>{index}</Text>
            )}
          /> */}
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: 10,
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "red",

  }
});

export default connect(
  state => {
    return {
      dashboardData: state.home.dashboardData,
      loading: state.home.loading,
    };
  }, {
  getDashboardData,
}
)(HomeScreen);
