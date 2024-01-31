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
  StatusBar,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ProgressCircle from 'react-native-progress-circle'
import CardRender from '../../components/Card';
import {
  getDashboardData,
} from './home';
import HeaderSection from '../../components/HeaderSection';
import { PageLoader } from '../../components';
import { Text } from '../../components/StyledText';
import DataTransfer from 'react-native-vector-icons/Entypo';
import MessageBox from 'react-native-vector-icons/Feather';
import MobileIcon from 'react-native-vector-icons/AntDesign';
import UserAccount from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceSetup from 'react-native-vector-icons/SimpleLineIcons';
import Support from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { formatSizeUnits } from '../../utils/validate';
import { fonts } from '../../styles';
import Swap from 'react-native-vector-icons/Fontisto';
import Cross from 'react-native-vector-icons/Entypo'
import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar';

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

const match = (str) => str.match(/\d+\.\d+/);

class HomeScreen extends Component {

  state = {
    activeIndex: 1,
    showBalanceData: false
  };

  componentDidMount() {
    this.props.getDashboardData();
  }

  handleRender = () => {
    const { showBalanceData } = this.state;
    this.setState({ showBalanceData: !showBalanceData });
  }

  get pagination() {
    const { activeIndex, } = this.state
    const {
      balances,
    } = this.props;
    return (
      <Pagination
        dotsLength={(balances || []).length}
        activeDotIndex={activeIndex}
        containerStyle={{}}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 5,
        }}
        inactiveDotStyle={{
          width: 6,
          height: 6,
          borderRadius: 3,
          borderWidth: 1,
          borderColor: 'black',
          backgroundColor: 'white'
        }}
        inactiveDotOpacity={0.2}
        inactiveDotScale={1.3}
      />
    );
  }

  _renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.cardContainer}
        onPress={this.handleRender}
        key={index}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <View>{item.icon}</View>
          <Text style={{ marginTop: -5, marginLeft: 3, fontFamily: fonts.primaryRegular, }}>{item.title}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <ProgressCircle
            percent={(item.percent || 0)}
            radius={50}
            borderWidth={5}
            color="#00A36C"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={[styles.avlDateText, { color: item.percent > 0 ? '#00A36C' : 'red' }]}>{item.totalAmount}</Text>
            <Text style={styles.usedDataText}>{item.usedAmount}</Text>
          </ProgressCircle>
        </View>
      </TouchableOpacity>
    );
  };

  MyBalanceRender = () => {
    const { dashboardData, balances } = this.props;

    const { showBalanceData } = this.state;
    if (showBalanceData) {
      return (
        <View>
          {this._renderProgessBar()}
        </View>
      );
    }

    return (
      <View>
        <Text style={{ fontSize: 16, color: colors[0], padding: 10, fontFamily: fonts.primaryBold }}>My Balances</Text>
        <Carousel
          // {...baseOptions}
          // style={{
          //   width: PAGE_WIDTH,
          // }}
          // loop
          pagingEnabled={false}
          snapEnabled={true}
          autoPlay={true}
          autoPlayInterval={1500}
          // onProgressChange={(_, absoluteProgress) =>
          //   (progressValue.value = absoluteProgress)
          // }
          sliderWidth={PAGE_WIDTH}
          itemWidth={PAGE_WIDTH - 180}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 16,
          }}
          data={balances || []}
          renderItem={this._renderItem}
          activeSlideAlignment={'center'}
          // containerCustomStyle={{ flex: 1 }}
          onSnapToItem={index => { this.setState({ activeIndex: index }) }}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.9}
          firstItem={Math.floor(balances.length / 2)}
        />
      </View>
    )
  }

  renderCards = () => {
    const { navigation } = this.props;
    const data = [
      {
        icon: <Image source={require("../../images/mobile.png")} style={{ width: 40, height: 40 }} />,
        title: 'Topup Airtime',
        onPress: () => navigation.navigate('TopupAirtime', { topUpType: 'AIRTIME' })
      },
      {
        icon: <MobileIcon name={'questioncircleo'} size={30} color='#0083c2' />,
        title: 'Topup Voice',
        onPress: () => navigation.navigate('TopupVoice', { topUpType: 'VOICE' })
      },
      {
        icon: <UserAccount name={'account-reactivate-outline'} size={30} color='#0083c2' />,
        title: 'Topup Data',
        onPress: () => navigation.navigate('TopupData', { topUpType: 'DATA' })
      },
      {
        icon: <DeviceSetup name={'wrench'} size={30} color='#0083c2' />,
        title: 'Emergency Topup',
      },
      {
        icon: <Support name={'hand-coin'} size={30} color='#0083c2' />,
        title: 'Support And Downloads',
      },
    ]
    return (
      <View style={{ marginHorizontal: 15 }}>
        <Text style={{ fontSize: 16, color: colors[0], marginVertical: 15, fontFamily: fonts.primaryBold, marginHorizontal: 10 }}>Recharge</Text>
        <CardRender data={data} />
      </View>
    )
  }

  _renderProgessBar = () => {
    const { dashboardData } = this.props;
    const resourceBalance = dashboardData?.balances?.resourceBalance;

    if (resourceBalance) {
      const finalGB = resourceBalance.reduce((sum, resource) => sum + (resource.totalAmount / (1024 ** 3)), 0);
      return (
        <View style={styles.progressCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>{<Swap name='arrow-swap' color={'#000'} size={20} />}</View>
              <Text style={styles.totalSum}>{`${finalGB.toFixed(1)} GB`}</Text>
            </View>
            <TouchableOpacity onPress={this.handleRender}>{<Cross name='cross' color={'#000'} size={20} />}</TouchableOpacity>
          </View>
          {resourceBalance.map((resource, i) => {
            const totalAmount = resource.totalAmount;
            const AmountInGB = totalAmount / (1024 ** 3);
            return (
              <View key={i} style={styles.progressBar}>

                <ProgressBar
                  progress={AmountInGB / finalGB}
                  width={PAGE_WIDTH - 100}
                  height={10}
                  borderRadius={10}
                  useNativeDriver={false}
                  color={'green'}
                  // indeterminate={true}
                  animated={true}
                />
                <Text style={styles.progressName}>{resource.typeName}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 12, color: '#000000', fontFamily: fonts.primaryBold, }}>{`${AmountInGB.toFixed(1)} GB Remaining`}</Text>
                  <Text style={{ fontSize: 12, fontFamily: fonts.primaryRegular, }}>{` Expires: ${resource.endBillCycle}`}</Text>
                </View>
              </View>
            )
          })}
        </View>
      );
    }

    return null;
  }

  render() {
    const { navigation, loading, dashboardData } = this.props;
    return (
      <>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent={true} />
        <PageLoader loading={loading} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 40, }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.props.getDashboardData}
            />
          }>
          <HeaderSection />
          {this.MyBalanceRender()}
          {this.pagination}
          <View style={{ marginVertical: 0, borderWidth: 1, borderTopColor: '#809397', opacity: 0.2, marginHorizontal: 20 }} />
          {this.renderCards()}
        </ScrollView>
      </>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    // marginTop: 10,
    // padding: 10,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "red",

  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 15,
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 5
  },
  avlDateText: {
    fontFamily: fonts.primaryBold,
  },
  usedDataText: {
    fontSize: 10,
    fontFamily: fonts.primaryRegular,
  },
  progressCard: {
    marginHorizontal: 30,
    backgroundColor: '#fff',
    marginVertical: 20
  },
  progressBar: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10
  },
  progressName: {
    fontSize: 16,
    fontFamily: fonts.primaryMedium,
    color: '#0083c2'
  },
  totalSum: {
    fontSize: 18,
    color: '#0083c2',
    marginLeft: 20,
    fontFamily: fonts.primaryMedium,
  }
});

export default connect(
  state => {
    const dashboardData = state.home.dashboardData;
    const balances = [];
    const totalAirtimeBalance = (dashboardData?.balances?.airtimeBalance || []).reduce((acc, item) => acc + parseFloat(item.balanceAmount), 0);

    balances.push({
      totalAmount: `${totalAirtimeBalance.toFixed()} MINS`,
      usedAmount: `0 MINS`,
      percent: 0,
      title: 'Voice',
      icon: <Feather name={'mic'} size={10} />,
      avlData: 0,
    });

    const totalResourceBalance = (dashboardData?.balances?.resourceBalance || []).reduce((acc, item) => {
      const totalAmountInBytes = parseInt(item.totalAmount);
      const totalUsedAmountInBytes = parseInt(item.usedAmount);

      acc.totalResourceBalanceBytes += totalAmountInBytes;
      acc.totalUsedAmountInBytes += totalUsedAmountInBytes;

      return acc;
    }, {
      totalResourceBalanceBytes: 0,
      totalUsedAmountInBytes: 0,
    });

    balances.push({
      totalAmount: formatSizeUnits(totalResourceBalance.totalResourceBalanceBytes),
      usedAmount: `${formatSizeUnits(totalResourceBalance.totalUsedAmountInBytes)} USED`,
      percent: (1 - totalResourceBalance.totalUsedAmountInBytes / totalResourceBalance.totalResourceBalanceBytes) * 100,
      title: 'Data',
      icon: <DataTransfer name={'select-arrows'} size={10} />,
    });

    balances.push({
      title: 'SMS',
      icon: <MessageBox name='message-square' size={10} />,
      totalAmount: '0 SMS',
      usedAmount: '0 SMS',
      percent: 0,
    });
    return {
      dashboardData,
      balances,
      loading: state.home.loading,
    };
  }, {
  getDashboardData,
}
)(HomeScreen);
